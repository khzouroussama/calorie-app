import AWS, { DynamoDB } from 'aws-sdk';

AWS.config.update({
  region: process.env.REGION,
});

let client: DynamoDB | null = null;

export function getClient() {
  if (!client) {
    client = new DynamoDB();
  }

  return client;
}
