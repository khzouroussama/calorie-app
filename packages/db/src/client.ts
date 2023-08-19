import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

let client: DynamoDBClient | null = null;

export function getClient() {
  if (!client) {
    return new DynamoDBClient({
      region: process.env.REGION,
    });
  }
  return client;
}
