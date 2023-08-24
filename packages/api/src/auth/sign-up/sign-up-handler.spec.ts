import 'aws-sdk-client-mock-jest';
import { mockClient } from 'aws-sdk-client-mock';
import * as userModel from '@/users/user.model';

import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';

// Create a mock instance for CognitoIdentityServiceProvider
const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient();

const cognitoMock = mockClient(cognitoIdentityServiceProvider);

const mockEvent = {
  version: 1,
  region: 'eu-west-1',
  callerContext: {
    awsSdkVersion: 'aws-sdk-unknown-unknown',
    clientId: 'd00fe19191a6l0mic6aoob8cb',
  },
  userPoolId: 'eu-west-1_d6vDga9wU',
  userName: 'ce0404af-b4a0-4305-a277-b1efd7ff8fed',
  triggerSource: 'PostConfirmation_ConfirmSignUp',
  request: {
    userAttributes: {
      sub: 'ce0404af-b4a0-4305-a277-b1efd7ff8fed',
      email: 'khzouroussama+2@gmail.com',
    },
  },
  response: {},
} as const;

describe('Lambda function tests', () => {
  const originalProcessEnv = { ...process.env };
  //
  beforeEach(() => {
    cognitoMock.reset();
  });

  beforeAll(() => {
    process.env.STAGE = 'staging';
    process.env.REGION = 'eu-west-1';
  });

  afterAll(() => {
    process.env = originalProcessEnv;
  });

  it('should handle user post confirmation', async () => {
    // Mocking the behavior of Cognito's adminAddUserToGroup
    cognitoMock.on(AdminAddUserToGroupCommand).resolves({});

    // Mocking the behavior of createUser function
    const mockCreateUser = jest.spyOn(userModel, 'createUser');
    mockCreateUser.mockResolvedValue({
      id: mockEvent.userName,
      role: 'user',
      email: mockEvent.request.userAttributes.email,
      calorieLimit: 2100,
    });

    const main = (await import('./sign-up-handler')).main;
    const result = await main(mockEvent as any);

    // Assertions
    // expect(cognitoMock).toHaveReceivedCommandWith(AdminAddUserToGroupCommand, {
    //   UserPoolId: mockEvent.userPoolId,
    //   Username: mockEvent.request.userAttributes.sub,
    //   GroupName: `user-${process.env?.STAGE?.toLowerCase() || 'dev'}`,
    // });
    expect(mockCreateUser).toHaveBeenCalled();
    expect(result).toEqual(mockEvent);
  });
});
