import { AttributeValue, QueryCommand } from '@aws-sdk/client-dynamodb';
import { QueryParams } from './types';

export type PaginationParams = QueryParams<{ cursor?: string; limit?: number }>;

export const encodeCursor = (data: Record<string, AttributeValue>): string =>
  Buffer.from(JSON.stringify(data)).toString('base64');

export const decodeCursor = (data: string): any =>
  JSON.parse(Buffer.from(data, 'base64').toString('utf8'));

export const paginateParams = (cursor?: string, limit?: number) => {
  const params: Pick<QueryCommand['input'], 'Limit' | 'ExclusiveStartKey'> = {};

  if (cursor) {
    params.ExclusiveStartKey = decodeCursor(cursor);
  }

  if (limit) {
    params.Limit = limit;
  }

  return params;
};
