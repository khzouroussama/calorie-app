import { CognitoUserPoolTriggerEvent } from 'aws-lambda';

export const main = async (event: CognitoUserPoolTriggerEvent, context) => {
  const test = event.request.userAttributes;

  console.log({ test });
};
