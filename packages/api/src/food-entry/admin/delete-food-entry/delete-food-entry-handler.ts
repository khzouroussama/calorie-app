import { FoodEntryKeys, deleteFoodEntry } from '@/food-entry/food-entry.model';
import {
  createHandler,
  PathParams,
  httpError,
  httpResponse,
  adminMiddleware,
} from '@calorie-app/http';

type Params = PathParams<{ id: string }>;

export const main = createHandler<Params>(async (event, context) => {
  const [userId, foodEntryId] = event.pathParameters.id.split('_');

  try {
    const result = await deleteFoodEntry(
      userId,
      new FoodEntryKeys(userId, foodEntryId),
    );

    return httpResponse(result);
  } catch (e) {
    return httpError(e);
  }
});

main.use([adminMiddleware()]);
