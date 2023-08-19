import {
  DynamoDBClient,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from '@aws-sdk/client-dynamodb';

type ExecuteTransactWriteInput = {
  client: DynamoDBClient;
  params: TransactWriteItemsCommandInput;
};

export async function executeTransactWrite({
  client,
  params,
}: ExecuteTransactWriteInput) {
  try {
    const response = await client.send(new TransactWriteItemsCommand(params));
    return response;
  } catch (err) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'CancellationReasons' in err &&
      'fault' in err &&
      // @ts-ignore
      err.$fault === 'client'
    ) {
      console.error(
        'Transaction Cancellation Reasons:',
        err.CancellationReasons,
      );
    }
    throw err;
  }
}
