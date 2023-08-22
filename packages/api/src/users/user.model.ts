import { Item, ItemKeys, createItem, getItem, query } from '@calorie-app/db';
import { UserRoles } from './user.types';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { encodeCursor, paginateParams } from '@calorie-app/http';

export interface UserModel {
  /** The user's unique ID from cognito (sub) */
  id: string;
  email: string;
  role: UserRoles;
  calorieLimit: number;
}

export class UserKeys extends ItemKeys {
  static ENTITY_TYPE = 'USER';

  constructor(private userId: string) {
    super();
  }

  get pk() {
    return `${UserKeys.ENTITY_TYPE}#${this.userId}`;
  }

  get sk() {
    return `${UserKeys.ENTITY_TYPE}#${this.userId}`;
  }
}

export class User extends Item<UserModel> {
  constructor(private user: UserModel) {
    super();
  }

  static fromItem(attributeMap: Record<string, AttributeValue>): UserModel {
    return {
      id: attributeMap.id.S!,
      email: attributeMap.email.S!,
      role: attributeMap.role.S as UserRoles,
      calorieLimit: parseFloat(attributeMap.calorieLimit.N || '0'),
    };
  }

  get keys() {
    return new UserKeys(this.user.id);
  }

  get gsi1pk() {
    return `USERS`;
  }

  get gsi1sk() {
    return `#USER`;
  }

  toItem() {
    return {
      ...this.marshall(this.user),
      GSI1PK: { S: this.gsi1pk },
      GSI1SK: { S: this.gsi1sk },
    };
  }
}

export async function createUser(user: User): Promise<UserModel> {
  await createItem(user);

  return User.fromItem(user.toItem());
}

export async function getUser(userKeys: UserKeys): Promise<UserModel> {
  const result = await getItem(userKeys);

  return User.fromItem(result.Item ?? {});
}

export const getAllUsers = async (cursor?: string, limit?: number) => {
  const params: Parameters<typeof query>[0] = {
    IndexName: 'GSI1',
    KeyConditionExpression: '#gsi1pk = :gsi1pk',
    ExpressionAttributeNames: {
      '#gsi1pk': 'GSI1PK',
    },
    ExpressionAttributeValues: {
      ':gsi1pk': { S: 'USERS' },
    },
    ScanIndexForward: false,
  };

  const result = await query({
    ...params,
    ...paginateParams(cursor, limit),
  });

  return {
    users: result.Items?.map((item) => User.fromItem(item)),
    nextCursor: result.LastEvaluatedKey
      ? encodeCursor(result.LastEvaluatedKey)
      : null,
  };
};
