import { getClient } from './client';
import { Item } from './item';
import { ItemKeys } from './itemKeys';
import { DynamoDB } from 'aws-sdk';
import { dbErrorLogger } from './errors';
import { DYNAMODB_TABLE_NAME } from './constants';

export async function createItem<T extends Item<any>>(
  item: T,
  options?: Omit<DynamoDB.PutItemInput, 'TableName'>,
) {
  const db = getClient();

  try {
    return await db
      .putItem({
        TableName: DYNAMODB_TABLE_NAME,
        Item: item.toItem(),
        ConditionExpression: 'attribute_not_exists(SK)',
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function updateItem(
  keys: ItemKeys,
  options?: Omit<DynamoDB.UpdateItemInput, 'TableName' | 'Key'>,
) {
  const db = getClient();

  try {
    return await db
      .updateItem({
        TableName: DYNAMODB_TABLE_NAME,
        Key: keys.toItem(),
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function deleteItem(
  keys: ItemKeys,
  options?: Omit<DynamoDB.DeleteItemInput, 'TableName'>,
) {
  const db = getClient();

  try {
    await db
      .deleteItem({
        TableName: DYNAMODB_TABLE_NAME,
        Key: keys.toItem(),
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function query(options: Omit<DynamoDB.QueryInput, 'TableName'>) {
  const db = getClient();

  try {
    return await db
      .query({
        TableName: DYNAMODB_TABLE_NAME,
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}

export async function getItem(
  keys: ItemKeys,
  options?: Omit<DynamoDB.GetItemInput, 'TableName'>,
) {
  const db = getClient();

  try {
    return await db
      .getItem({
        TableName: DYNAMODB_TABLE_NAME,
        Key: keys.toItem(),
        ...options,
      })
      .promise();
  } catch (e) {
    dbErrorLogger(e);

    throw {
      success: false,
    };
  }
}
