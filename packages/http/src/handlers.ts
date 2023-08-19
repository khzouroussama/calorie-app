import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { EventParams, Handler } from './types';

export function createHandler<
  P extends EventParams,
  isProtected extends boolean = false,
>(handler: Handler<P, isProtected>) {
  return middy(handler).use(middyJsonBodyParser());
}
