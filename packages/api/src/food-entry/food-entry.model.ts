import {
  DYNAMODB_TABLE_NAME,
  Item,
  ItemKeys,
  buildDynamicUpdateParams,
  deleteItem,
  executeTransactWrite,
  getClient,
  getItem,
  query,
} from '@calorie-app/db';
import { NativeAttributeValue } from '@aws-sdk/util-dynamodb';
import { UserKeys } from '../users/user.model';
import {
  GlobalEntryCount,
  UserCalorieCount,
} from '@/reporting/aggregation.model';
import { encodeCursor, paginateParams } from '@calorie-app/http';
import { getFoodEntrySignedUrl } from './food-entry.helpers';

export interface FoodEntryModel {
  /**  ISOfstring of the date of when the food entry was created */
  id?: string;
  name: string;
  calories: number;
  photoUrl?: string;
  consumptionDate: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

export class FoodEntryKeys extends ItemKeys {
  static ENTITY_TYPE = 'FOODENTRY';

  constructor(private userId: string, private dateOfConsumption: string) {
    super();
  }

  get pk() {
    return `${UserKeys.ENTITY_TYPE}#${this.userId}`;
  }

  get sk() {
    return `${FoodEntryKeys.ENTITY_TYPE}#${this.dateOfConsumption}`;
  }
}

export class FoodEntry extends Item<FoodEntryModel> {
  constructor(private userId: string, private foodEntry: FoodEntryModel) {
    super();
  }

  static fromItem(
    attributeMap: Record<string, NativeAttributeValue>,
  ): FoodEntryModel {
    return {
      id: attributeMap?.id?.S,
      name: attributeMap?.name?.S,
      calories: parseFloat(attributeMap?.calories?.N || '0'),
      consumptionDate: attributeMap?.consumptionDate?.S,
      photoUrl: attributeMap?.photoUrl?.S,
      createdAt: attributeMap?.createdAt?.S,
      updatedAt: attributeMap?.updatedAt?.S,
      userId: attributeMap?.PK?.S?.split?.('#')?.[1],
    };
  }

  get keys() {
    return new FoodEntryKeys(this.userId, this.foodEntry.consumptionDate!);
  }

  get gsi1pk() {
    return `FOODENTRIES`;
  }

  get gsi1sk() {
    return `${FoodEntryKeys.ENTITY_TYPE}#${this.foodEntry.consumptionDate}`;
  }

  toItem() {
    return {
      ...this.marshall(this.foodEntry),
      GSI1PK: { S: this.gsi1pk },
      GSI1SK: { S: this.gsi1sk },
    };
  }
}

export const createFoodEntry = async (
  userId: string,
  foodEntry: FoodEntryModel,
) => {
  const client = getClient();

  const food = new FoodEntry(userId, {
    ...foodEntry,
    createdAt: `${new Date().toISOString()}`,
  });

  const globalEntryCount = new GlobalEntryCount({
    date: foodEntry.consumptionDate.split('T')[0],
  });

  const userCalorieCount = new UserCalorieCount({
    userId,
    date: foodEntry.consumptionDate.split('T')[0],
  });

  console.log({
    food,
    foodToItam: food.toItem(),
    foodEntry,
  });

  await executeTransactWrite({
    client,
    params: {
      TransactItems: [
        {
          Put: {
            TableName: DYNAMODB_TABLE_NAME,
            Item: food.toItem(),
            ConditionExpression: 'attribute_not_exists(PK)',
          },
        },
        {
          Update: {
            ...buildDynamicUpdateParams(globalEntryCount, {
              UpdateExpression: 'ADD #totalEntries :one',
              ExpressionAttributeNames: { '#totalEntries': 'count' },
              ExpressionAttributeValues: {
                ':one': { N: '1' },
              },
            }),
          },
        },
        {
          Update: {
            ...buildDynamicUpdateParams(userCalorieCount, {
              UpdateExpression: 'ADD #totalOfCalories :total',
              ExpressionAttributeNames: {
                '#totalOfCalories': 'totalOfCalories',
              },
              ExpressionAttributeValues: {
                ':total': { N: `${foodEntry.calories}` },
              },
            }),
          },
        },
      ],
    },
  });

  return food;
};

export const updateFoodEntry = async (
  userId: string,
  foodEntry: FoodEntryModel,
) => {
  const client = getClient();

  const oldFood = new FoodEntry(userId, {
    ...foodEntry,
    consumptionDate: foodEntry.id as string,
  });

  const newFood = new FoodEntry(userId, {
    ...foodEntry,
    updatedAt: new Date().toISOString(),
  });

  const oldFoodEntryResult = await getItem(oldFood.keys);
  const oldFoodEntry = FoodEntry.fromItem(oldFoodEntryResult.Item ?? {});

  const userCalorieCount = new UserCalorieCount({
    userId,
    date: foodEntry.consumptionDate!.split('T')[0],
  });

  console.log({
    d: oldFoodEntry,
    oldFoodEntryResult,
    foodEntrys: foodEntry.consumptionDate,
  });

  await executeTransactWrite({
    client,
    params: {
      TransactItems: [
        {
          Put: {
            TableName: DYNAMODB_TABLE_NAME,
            Item: newFood.toItem(),
          },
        },
        {
          Update: {
            ...buildDynamicUpdateParams(userCalorieCount, {
              UpdateExpression: 'ADD #totalOfCalories :total',
              ExpressionAttributeNames: {
                '#totalOfCalories': 'totalOfCalories',
              },
              ExpressionAttributeValues: {
                ':total': {
                  N: `${-oldFoodEntry.calories + foodEntry.calories}`,
                },
              },
            }),
          },
        },
      ],
    },
  });

  if (
    oldFoodEntry &&
    foodEntry.consumptionDate !== oldFoodEntry?.consumptionDate
  ) {
    await deleteItem(oldFood.keys);
  }

  return { success: true };
};

export const deleteFoodEntry = async (
  userId: string,
  foodEntryKeys: FoodEntryKeys,
) => {
  const client = getClient();

  const oldFoodEntry = await getItem(foodEntryKeys);
  const foodEntryItem = FoodEntry.fromItem(oldFoodEntry.Item ?? {});

  const globalEntryCount = new GlobalEntryCount({
    date: foodEntryItem.consumptionDate.split('T')[0],
  });

  const userCalorieCount = new UserCalorieCount({
    userId,
    date: foodEntryItem.consumptionDate.split('T')[0],
  });

  await executeTransactWrite({
    client,
    params: {
      TransactItems: [
        {
          Delete: {
            TableName: DYNAMODB_TABLE_NAME,
            Key: foodEntryKeys.toItem(),
          },
        },
        {
          Update: {
            ...buildDynamicUpdateParams(userCalorieCount, {
              UpdateExpression: 'ADD #totalOfCalories :total',
              ExpressionAttributeNames: {
                '#totalOfCalories': 'totalOfCalories',
              },
              ExpressionAttributeValues: {
                ':total': { N: `${-foodEntryItem.calories}` },
              },
            }),
          },
        },
        {
          Update: {
            ...buildDynamicUpdateParams(globalEntryCount, {
              UpdateExpression: 'ADD #totalEntries :one',
              ExpressionAttributeNames: { '#totalEntries': 'count' },
              ExpressionAttributeValues: {
                ':one': { N: '-1' },
              },
            }),
          },
        },
      ],
    },
  });

  return { success: true };
};

export const getUserFoodEntries = async (
  userKeys: UserKeys,
  cursor?: string,
  limit?: number,
  filters?: {
    dateFrom?: string;
    dateTo?: string;
  },
) => {
  const defaultFromDate = new Date(0, 0, 1).toISOString();
  const defaultToDate = new Date().toISOString();

  const params: Parameters<typeof query>[0] = {
    KeyConditionExpression: '#pk = :pk AND #sk BETWEEN :dateFrom AND :dateTo',
    ExpressionAttributeNames: {
      '#pk': 'PK',
      '#sk': 'SK',
    },
    ExpressionAttributeValues: {
      ':pk': { S: userKeys.pk },
      ':dateFrom': {
        S: `${FoodEntryKeys.ENTITY_TYPE}#${
          filters?.dateFrom || defaultFromDate
        }`,
      },
      ':dateTo': {
        S: `${FoodEntryKeys.ENTITY_TYPE}#${filters?.dateTo || defaultToDate}`,
      },
    },
    ScanIndexForward: false,
  };

  const result = await query({
    ...params,
    ...paginateParams(cursor, limit),
  });

  const foodEntries = result.Items?.map((item) => FoodEntry.fromItem(item));

  const foodEntriesWithSignedUrl = await Promise.all(
    foodEntries?.map(async (item) => ({
      ...item,
      photoUrl: await getFoodEntrySignedUrl(item.photoUrl),
    }))!,
  );

  return {
    foodEntries: foodEntriesWithSignedUrl,
    nextCursor: result.LastEvaluatedKey
      ? encodeCursor(result.LastEvaluatedKey)
      : null,
  };
};

export const getFoodEntries = async (
  cursor?: string,
  limit?: number,
  filters?: {
    dateFrom?: string;
    dateTo?: string;
  },
) => {
  const defaultFromDate = new Date(0, 0, 1).toISOString();
  const defaultToDate = new Date().toISOString();

  const params: Parameters<typeof query>[0] = {
    IndexName: 'GSI1',
    KeyConditionExpression:
      '#gsi1pk = :gsi1pk AND #gsi1sk BETWEEN :dateFrom AND :dateTo',
    ExpressionAttributeNames: {
      '#gsi1pk': 'GSI1PK',
      '#gsi1sk': 'GSI1SK',
    },
    ExpressionAttributeValues: {
      ':gsi1pk': { S: 'FOODENTRIES' },
      ':dateFrom': {
        S: `${FoodEntryKeys.ENTITY_TYPE}#${
          filters?.dateFrom || defaultFromDate
        }`,
      },
      ':dateTo': {
        S: `${FoodEntryKeys.ENTITY_TYPE}#${filters?.dateTo || defaultToDate}`,
      },
    },
    ScanIndexForward: false,
  };

  const result = await query({
    ...params,
    ...paginateParams(cursor, limit),
  });

  const foodEntries = result.Items?.map((item) => FoodEntry.fromItem(item));

  const foodEntriesWithSignedUrl = await Promise.all(
    foodEntries?.map(async (item) => ({
      ...item,
      photoUrl: await getFoodEntrySignedUrl(item.photoUrl),
    }))!,
  );

  return {
    foodEntries: foodEntriesWithSignedUrl,
    nextCursor: result.LastEvaluatedKey
      ? encodeCursor(result.LastEvaluatedKey)
      : null,
  };
};
