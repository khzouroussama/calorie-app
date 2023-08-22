import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Handler } from '../types';
import { httpError } from '../error';

export function adminMiddleware(): middy.MiddlewareObj<
  Parameters<Handler<any>>[0],
  APIGatewayProxyResult
> {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request) => {
    const userGroup =
      request.event.requestContext.authorizer?.claims?.['cognito:groups'];

    if (userGroup === `admin-${process.env.STAGE?.toLowerCase()}`) {
      return Promise.resolve();
    } else {
      return httpError(
        new Error('Unauthorized - Only admins allowed to perform this action'),
        { statusCode: 401 },
      );
    }
  };

  return {
    before,
  };
}
