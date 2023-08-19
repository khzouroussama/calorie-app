import { Item, ItemKeys, createItem, getItem } from '@calorie-app/db';
import { AttributeValue } from '@aws-sdk/client-dynamodb';

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

  get gsi1pk(): string | undefined {
    return undefined;
  }

  get gsi1sk(): string | undefined {
    return undefined;
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

  get gsi1pk(): string | undefined {
    return undefined;
  }

  get gsi1sk(): string | undefined {
    return undefined;
  }
}

// User Calorie Count

export interface UserCalorieCountModel {
  userId: string;
  // a date only string in the format of YYYY-MM-DD
  date: string;
  totalCalories?: number;
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

  get gsi1pk(): string | undefined {
    return undefined;
  }

  get gsi1sk(): string | undefined {
    return undefined;
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
      totalCalories: parseFloat(attributeMap.totalCalories.N || '0'),
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
