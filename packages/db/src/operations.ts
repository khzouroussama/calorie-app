import {
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  QueryCommand,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb';

import { Item } from './item';
import { ItemKeys } from './itemKeys';
import { dbErrorLogger } from './errors';
import { DYNAMODB_TABLE_NAME } from './constants';

import { getClient } from './client';

export async function createItem<T extends Item<any>>(
  item: T,
  options?: Omit<PutItemCommand['input'], 'TableName'>,
) {
  const db = getClient();

  try {
    return await db.send(
      new PutItemCommand({
        TableName: DYNAMODB_TABLE_NAME,
        Item: item.toItem(),
        ConditionExpression: 'attribute_not_exists(SK)',
        ...options,
      }),
    );
  } catch (e) {
    dbErrorLogger(e);
    throw { success: false };
  }
}

export async function updateItem(
  keys: ItemKeys,
  options?: Omit<UpdateItemCommand['input'], 'TableName' | 'Key'>,
) {
  const db = getClient();

  try {
    return await db.send(
      new UpdateItemCommand({
        TableName: DYNAMODB_TABLE_NAME,
        Key: keys.toItem(),
        ...options,
      }),
    );
  } catch (e) {
    dbErrorLogger(e);
    throw { success: false };
  }
}

export async function deleteItem(
  keys: ItemKeys,
  options?: Omit<DeleteItemCommand['input'], 'TableName'>,
) {
  const db = getClient();

  try {
    return await db.send(
      new DeleteItemCommand({
        TableName: DYNAMODB_TABLE_NAME,
        Key: keys.toItem(),
        ...options,
      }),
    );
  } catch (e) {
    dbErrorLogger(e);
    throw { success: false };
  }
}

export async function query(options: Omit<QueryCommand['input'], 'TableName'>) {
  const db = getClient();

  try {
    return await db.send(
      new QueryCommand({
        TableName: DYNAMODB_TABLE_NAME,
        ...options,
      }),
    );
  } catch (e) {
    dbErrorLogger(e);
    throw { success: false };
  }
}

export async function getItem(
  keys: ItemKeys,
  options?: Omit<GetItemCommand['input'], 'TableName'>,
) {
  const db = getClient();
  console.log({
    keys,
    titem: keys.toItem(),
  });

  try {
    return await db.send(
      new GetItemCommand({
        TableName: DYNAMODB_TABLE_NAME,
        Key: keys.toItem(),
        ...options,
      }),
    );
  } catch (e) {
    console.log('getItem:', e);
    dbErrorLogger(e);
    throw { success: false };
  }
}

export function buildDynamicUpdateParams<T extends Item<any>>(
  item: T,
  options?: Partial<Omit<UpdateItemCommand['input'], 'TableName'>>,
) {
  const allDbKeys = Object.keys(item.keys.toItem());

  const itemKeys = Object.keys(item.toItem()).filter(
    (k) => !allDbKeys.includes(k),
  );

  return {
    TableName: DYNAMODB_TABLE_NAME,
    Key: options?.Key ? options.Key : item.keys.toItem(),
    ReturnValues: 'ALL_NEW',
    UpdateExpression: `SET ${itemKeys
      .map((k, index) => `#field${index} = :value${index}`)
      .join(', ')} ${options?.UpdateExpression || ''}`,
    ExpressionAttributeNames: itemKeys.reduce(
      (accumulator, k, index) => ({
        ...accumulator,
        [`#field${index}`]: k,
      }),
      options?.ExpressionAttributeNames ?? {},
    ),
    ExpressionAttributeValues: itemKeys.reduce(
      (accumulator, k, index) => ({
        ...accumulator,
        [`:value${index}`]: item.toItem()[k],
      }),
      options?.ExpressionAttributeValues ?? {},
    ),
  } as const;
}

export async function updateOrReplaceItem<T extends Item<any>>(
  item: T,
  options?: Omit<UpdateItemCommand['input'], 'TableName'>,
) {
  const db = getClient();

  try {
    return await db.send(
      new UpdateItemCommand(buildDynamicUpdateParams(item, options as any)),
    ); // Cast as any to circumvent type checking for the purpose of the example
  } catch (e) {
    dbErrorLogger(e);
    throw { success: false };
  }
}
