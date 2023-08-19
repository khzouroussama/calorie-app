import { CognitoUserPoolTriggerEvent } from 'aws-lambda';
import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { User, createUser } from '@/users/user.model';
import { DEFAULT_CALORIE_LIMIT } from '@/users/user.constants';

export const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.REGION,
});

export const main = async (event: CognitoUserPoolTriggerEvent) => {
  const { userPoolId } = event;
  const { sub, email } = event.request.userAttributes;
  const triggerSource = event.triggerSource;

  try {
    if (triggerSource === 'PostConfirmation_ConfirmSignUp') {
      // Add user to Cognito group
      await cognitoClient.send(
        new AdminAddUserToGroupCommand({
          UserPoolId: userPoolId,
          Username: sub,
          GroupName: `user-${process.env?.STAGE?.toLowerCase() || 'dev'}`,
        }),
      );

      await createUser(
        new User({
          id: sub,
          role: 'user',
          email,
          calorieLimit: DEFAULT_CALORIE_LIMIT,
        }),
      );
    }
  } catch (e) {
    console.error('Error creating user: ', e);
    throw e;
  }

  return event;
};
