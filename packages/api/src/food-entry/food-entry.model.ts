import {
  DYNAMODB_TABLE_NAME,
  Item,
  ItemKeys,
  buildDynamicUpdateParams,
  executeTransactWrite,
  getClient,
  getItem,
} from '@calorie-app/db';
import { NativeAttributeValue } from '@aws-sdk/util-dynamodb';
import { UserKeys } from '../users/user.model';
import {
  GlobalEntryCount,
  UserCalorieCount,
} from '@/reporting/aggregation.model';

export interface FoodEntryModel {
  /**  ISO string of the date of when the food entry was created */
  id?: string;
  name: string;
  calories: number;
  photoUrl?: string;
  consumptionDate: string;
  createdAt?: string;
}

export class FoodEntryKeys extends ItemKeys {
  static ENTITY_TYPE = 'FOODENTRY';

  constructor(private userId: string, private foodEntryDate: string) {
    super();
  }

  get pk() {
    return `${UserKeys.ENTITY_TYPE}#${this.userId}`;
  }

  get sk() {
    return `${FoodEntryKeys.ENTITY_TYPE}#${this.foodEntryDate}`;
  }

  get gsi1pk() {
    return `FOODENTRIES`;
  }

  get gsi1sk() {
    return `${FoodEntryKeys.ENTITY_TYPE}#${this.foodEntryDate}`;
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
      id: attributeMap.id.S!,
      name: attributeMap.name.S!,
      calories: parseFloat(attributeMap.calories.N || '0'),
      consumptionDate: attributeMap.consumptionDate.S!,
      photoUrl: attributeMap.photoUrl.S!,
      createdAt: attributeMap.photoUrl.S!,
    };
  }

  get keys() {
    return new FoodEntryKeys(this.userId, this.foodEntry.consumptionDate!);
  }

  toItem() {
    return this.marshall(this.foodEntry);
  }
}

export const createFoodEntry = async (
  userId: string,
  foodEntry: FoodEntryModel,
) => {
  const client = getClient();

  const creationDate = new Date().toISOString();

  const food = new FoodEntry(userId, {
    ...foodEntry,
    createdAt: `${new Date().toISOString()}`,
  });

  const globalEntryCount = new GlobalEntryCount({
    date: creationDate.split('T')[0],
  });

  const userCalorieCount = new UserCalorieCount({
    userId,
    date: creationDate.split('T')[0],
  });

  console.log(
    JSON.stringify({
      t: food,
      item: food.toItem(),
      globalEntryCountkeystoitem: globalEntryCount.keys.toItem(),
      globalEntryCount: globalEntryCount,
      globalEntryCountToItem: globalEntryCount.toItem(),
      userCalorieCount,
      userCalorieCountToItem: userCalorieCount.toItem(),
      userCalorieCountkeys: userCalorieCount.keys.toItem(),
    }),
  );

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

  const food = new FoodEntry(userId, foodEntry);

  const oldFoodEntry = await getItem(new FoodEntryKeys(userId, foodEntry.id!));
  const oldCalories = FoodEntry.fromItem(oldFoodEntry.Item ?? {}).calories;

  const userCalorieCount = new UserCalorieCount({
    userId,
    date: foodEntry.id!.split('T')[0],
  });

  await executeTransactWrite({
    client,
    params: {
      TransactItems: [
        {
          Update: buildDynamicUpdateParams(food, {}),
        },
        {
          Update: {
            ...buildDynamicUpdateParams(userCalorieCount, {
              UpdateExpression: 'ADD #totalOfCalories :total',
              ExpressionAttributeNames: {
                '#totalOfCalories': 'totalOfCalories',
              },
              ExpressionAttributeValues: {
                ':total': { N: `${-oldCalories + foodEntry.calories}` },
              },
            }),
          },
        },
      ],
    },
  });

  return { success: true };
};
