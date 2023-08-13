import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { httpError } from '../error';
import { Handler, UserContext } from '../types';

const jwtSecret = process.env.JWT_SECRET;

export function authMiddleware(): middy.MiddlewareObj<
  Parameters<Handler<any>>[0],
  APIGatewayProxyResult
> {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request) => {
    const authHeader = request.event.headers['Authorization'];

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      try {
        const data = jwt.verify(token, jwtSecret);
        (request.context as unknown as UserContext).user =
          data as UserContext['user'];

        return Promise.resolve();
      } catch (error) {
        return httpError(error, { statusCode: 401 });
      }
    }

    return httpError('Missing token', { statusCode: 401 });
  };

  return {
    before,
  };
}
