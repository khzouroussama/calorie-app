import { FoodEntryModel, updateFoodEntry } from '@/food-entry/food-entry.model';
import {
  BodyParams,
  createHandler,
  PathParams,
  httpError,
  httpResponse,
  adminMiddleware,
} from '@calorie-app/http';

type Params = PathParams<{ id: string }> &
  BodyParams<Omit<FoodEntryModel, 'id'>>;

export const main = createHandler<Params>(async (event, context) => {
  const [userId, foodEntryId] = event.pathParameters.id.split('_');
  try {
    const result = await updateFoodEntry(userId, {
      ...event.body,
      id: foodEntryId,
    });

    return httpResponse(result);
  } catch (e) {
    return httpError(e);
  }
});

main.use([adminMiddleware()]);
