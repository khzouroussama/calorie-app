import {
  BodyParams,
  createHandler,
  PathParams,
  httpError,
  httpResponse,
} from '@calorie-app/http';
import { FoodEntryModel, updateFoodEntry } from '../food-entry.model';

type Params = PathParams<{ id: string }> &
  BodyParams<Omit<FoodEntryModel, 'id'>>;

export const main = createHandler<Params>(async (event, context) => {
  try {
    const result = await updateFoodEntry(
      event.requestContext.authorizer?.claims?.sub,
      {
        ...event.body,
        id: event.pathParameters?.id,
      },
    );

    return httpResponse(result);
  } catch (e) {
    return httpError(e);
  }
});
