import { getClient } from './client';
import { Item } from './item';
import { ItemKeys } from './itemKeys';
import { DynamoDB } from 'aws-sdk';
import { dbErrorLogger } from './errors';
import { DYNAMODB_TABLE_NAME } from './constants';
import { marshall } from '@aws-sdk/util-dynamodb';
import { openStdin } from 'process';

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

export function buildDynamicUpdateParams<T extends Item<any>>(
  item: T,
  options?: Omit<DynamoDB.UpdateItemInput, 'TableName' | 'Key'>,
) {
  const itemKeys = Object.keys(item.toItem());

  // When we do updates we need to tell DynamoDB what fields we want updated.
  // If that's not annoying enough, we also need to be careful as some field names
  // are reserved - so DynamoDB won't like them in the UpdateExpressions list.
  // To avoid passing reserved words we prefix each field with "#field" and provide the correct
  // field mapping in ExpressionAttributeNames. The same has to be done with the actual
  // value as well. They are prefixed with ":value" and mapped in ExpressionAttributeValues
  // along witht heir actual value
  return {
    TableName: DYNAMODB_TABLE_NAME,
    Key: item.keys.toItem(),
    ReturnValues: 'ALL_NEW',
    UpdateExpression: `SET ${itemKeys
      .map((k, index) => `#field${index} = :value${index}`)
      .join(', ')} ${options?.UpdateExpression}`,
    ExpressionAttributeNames: itemKeys.reduce(
      (accumulator, k, index) => ({
        ...accumulator,
        [`#field${index}`]: k,
      }),
      {
        ...options?.ExpressionAttributeNames,
      },
    ),
    ExpressionAttributeValues: marshall(
      itemKeys.reduce(
        (accumulator, k, index) => ({
          ...accumulator,
          [`:value${index}`]: item.toItem()[k],
        }),
        {
          ...options?.ExpressionAttributeValues,
        },
      ),
    ),
  } as const;
}

/**
 * Update item in DynamoDB table
 * @param {string} tableName // Name of the target table
 * @param {object} key // Object containing target item key(s)
 * @param {object} item // Object containing updates for target item
 */
export async function updateOrReplaceItem<T extends Item<any>>(
  item: T,
  options?: Omit<DynamoDB.GetItemInput, 'TableName'>,
) {
  const db = getClient();
  try {
    return await db
      .updateItem(buildDynamicUpdateParams(item, options))
      .promise();
  } catch (e) {
    dbErrorLogger(e);
    throw {
      success: false,
    };
  }
}
