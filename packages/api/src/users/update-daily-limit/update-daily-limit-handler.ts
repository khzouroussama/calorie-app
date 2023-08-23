import {
  BodyParams,
  createHandler,
  httpError,
  httpResponse,
} from '@calorie-app/http';
import { updateUserDailyLimit } from '../user.model';

type Params = BodyParams<{ newLimit: number }>;

export const main = createHandler<Params>(async (event, context) => {
  try {
    const result = await updateUserDailyLimit(
      event.requestContext.authorizer?.claims?.sub,
      +event.body.newLimit,
    );

    return httpResponse(result);
  } catch (e) {
    return httpError(e);
  }
});
