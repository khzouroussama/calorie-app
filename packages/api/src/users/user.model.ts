import { Item, ItemKeys, createItem, getItem } from '@calorie-app/db';
import { UserRoles } from './user.types';
import { DynamoDB } from 'aws-sdk';

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

  static fromItem(attributeMap: DynamoDB.AttributeMap): UserModel {
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

  toItem() {
    return this.marshall(this.user);
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
