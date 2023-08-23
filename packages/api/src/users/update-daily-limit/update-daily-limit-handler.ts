import {
  createHandler,
  httpError,
  httpResponse,
  QueryParams,
} from '@calorie-app/http';
import { updateUserDailyLimit } from '../user.model';

type Params = QueryParams<{ newLimit: number }>;

export const main = createHandler<Params>(async (event, context) => {
  try {
    const result = await updateUserDailyLimit(
      event.requestContext.authorizer?.claims?.sub,
      +event.queryStringParameters.newLimit,
    );

    return httpResponse(result);
  } catch (e) {
    return httpError(e);
  }
});
