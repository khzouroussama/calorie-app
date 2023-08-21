import {
  createHandler,
  PathParams,
  httpError,
  httpResponse,
} from '@calorie-app/http';
import { FoodEntryKeys, deleteFoodEntry } from '../food-entry.model';

type Params = PathParams<{ id: string }>;

export const main = createHandler<Params>(async (event, context) => {
  const userId = event.requestContext.authorizer?.claims?.sub;
  try {
    const result = await deleteFoodEntry(
      userId,
      new FoodEntryKeys(userId, event.pathParameters.id),
    );

    return httpResponse(result);
  } catch (e) {
    return httpError(e);
  }
});
