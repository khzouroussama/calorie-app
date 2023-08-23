import { Item, ItemKeys, createItem, getItem, query } from '@calorie-app/db';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { encodeCursor, paginateParams } from '@calorie-app/http';
import { User, UserKeys } from '@/users/user.model';
import { getNDaysAgoDate } from './reporting.helpers';

// Global Entry Count

export interface GlobalEntryCountModel {
  // this a date only string in the format of YYYY-MM-DD
  date: string;
  count?: number;
}

export class GlobalEntryCountKeys extends ItemKeys {
  static ENTITY_TYPE = 'AGGREGATION#ENTRIES';

  constructor(private date: string) {
    super();
  }

  get pk() {
    return GlobalEntryCountKeys.ENTITY_TYPE;
  }

  get sk() {
    return this.date;
  }
}

export class GlobalEntryCount extends Item<GlobalEntryCountModel> {
  constructor(private globalEntryCount: GlobalEntryCountModel) {
    super();
  }

  static fromItem(
    attributeMap: Record<string, AttributeValue>,
  ): GlobalEntryCountModel {
    return {
      date: attributeMap.date.S!,
      count: parseFloat(attributeMap.count.N || '0'),
    };
  }

  get keys() {
    return new GlobalEntryCountKeys(this.globalEntryCount.date);
  }

  toItem() {
    return this.marshall(this.globalEntryCount);
  }
}

// User Calorie Count

export interface UserCalorieCountModel {
  userId: string;
  // a date only string in the format of YYYY-MM-DD
  date: string;
  totalOfCalories?: number;
}

export class UserCalorieCountKeys extends ItemKeys {
  static ENTITY_PREFIX = 'AGGREGATION#CALORIES';

  constructor(private userId: string, private date: string) {
    super();
  }

  get pk() {
    return `${UserCalorieCountKeys.ENTITY_PREFIX}#${this.userId}`;
  }

  get sk() {
    return this.date;
  }
}

export class UserCalorieCount extends Item<UserCalorieCountModel> {
  constructor(private calorieCount: UserCalorieCountModel) {
    super();
  }

  static fromItem(
    attributeMap: Record<string, AttributeValue>,
  ): UserCalorieCountModel {
    return {
      userId: attributeMap.userId.S!,
      date: attributeMap.date.S!,
      totalOfCalories: parseFloat(attributeMap.totalOfCalories.N || '0'),
    };
  }

  get keys() {
    return new UserCalorieCountKeys(
      this.calorieCount.userId,
      this.calorieCount.date,
    );
  }

  toItem() {
    return this.marshall(this.calorieCount);
  }
}

// Utility functions for Global Entry Count

export async function createGlobalEntryCount(
  entryCount: GlobalEntryCount,
): Promise<GlobalEntryCountModel> {
  await createItem(entryCount);
  return GlobalEntryCount.fromItem(entryCount.toItem());
}

export async function getGlobalEntryCount(
  entryCountKeys: GlobalEntryCountKeys,
): Promise<GlobalEntryCountModel> {
  const result = await getItem(entryCountKeys);
  return GlobalEntryCount.fromItem(result.Item ?? {});
}

// Utility functions for User Calorie Count

export async function createUserCalorieCount(
  calorieCount: UserCalorieCount,
): Promise<UserCalorieCountModel> {
  await createItem(calorieCount);
  return UserCalorieCount.fromItem(calorieCount.toItem());
}

export async function getUserCalorieCount(
  calorieCountKeys: UserCalorieCountKeys,
): Promise<UserCalorieCountModel> {
  const result = await getItem(calorieCountKeys);
  return UserCalorieCount.fromItem(result.Item ?? {});
}

export const getDailyCalories = async (
  userId: string,
  cursor?: string,
  limit?: number,
  filters?: {
    exceededCalorieLimit: boolean;
  },
) => {
  const userKeys = new UserKeys(userId);
  const userCalorieCountKeys = new UserCalorieCountKeys(
    userId,
    new Date().toISOString().split('T')[0],
  );

  const user = User.fromItem((await getItem(userKeys)).Item || {});

  const params: Parameters<typeof query>[0] = {
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: {
      '#pk': 'PK',
    },
    ...(filters?.exceededCalorieLimit && {
      FilterExpression: 'totalOfCalories > :limit',
    }),
    ExpressionAttributeValues: {
      ':pk': userCalorieCountKeys.toItem().PK,
      ...(filters?.exceededCalorieLimit && {
        ':limit': { N: user.calorieLimit.toString() },
      }),
    },
    ScanIndexForward: false,
  };

  const result = await query({
    ...params,
    ...paginateParams(cursor, limit),
  });

  return {
    dailyCalories: result.Items?.map((item) => UserCalorieCount.fromItem(item)),
    nextCursor: result.LastEvaluatedKey
      ? encodeCursor(result.LastEvaluatedKey)
      : null,
  };
};

export const getAdminGlobalReports = async () => {
  const today = new Date().toISOString().split('T')[0];
  const date14DaysAgo = getNDaysAgoDate(14);

  const params: Parameters<typeof query>[0] = {
    KeyConditionExpression: '#pk = :pk AND #sk BETWEEN :min AND :max',
    ExpressionAttributeNames: {
      '#pk': 'PK',
      '#sk': 'SK',
    },
    ExpressionAttributeValues: {
      ':pk': {
        S: `AGGREGATION#ENTRIES`,
      },
      ':min': {
        S: date14DaysAgo,
      },
      ':max': {
        S: today,
      },
    },
    ScanIndexForward: false,
  };

  const result = await query({
    ...params,
  });

  return {
    reports: result.Items?.map((item) => GlobalEntryCount.fromItem(item)),
  };
};

export const getUserReports = async (userId: string) => {
  const userCalorieCountKeys = new UserCalorieCountKeys(
    userId,
    new Date().toISOString().split('T')[0],
  );

  const today = new Date().toISOString().split('T')[0];
  const date7DaysAgo = getNDaysAgoDate(7);

  const params: Parameters<typeof query>[0] = {
    KeyConditionExpression: '#pk = :pk AND #sk BETWEEN :min AND :max',
    ExpressionAttributeNames: {
      '#pk': 'PK',
      '#sk': 'SK',
    },
    ExpressionAttributeValues: {
      ':pk': userCalorieCountKeys.toItem().PK,
      ':min': {
        S: date7DaysAgo,
      },
      ':max': {
        S: today,
      },
    },
    ScanIndexForward: false,
  };

  const result = await query({
    ...params,
  });

  return {
    reports: result.Items?.map((item) => UserCalorieCount.fromItem(item)),
  };
};
