import { uploadFoodEntryPhoto } from '@/food-entry/food-entry.helpers';
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
  BodyParams<Omit<FoodEntryModel & { photo: any }, 'id'>>;

export const main = createHandler<Params>(async (event, context) => {
  const [userId, foodEntryId] = event.pathParameters.id.split('_');
  try {
    const result = await updateFoodEntry(userId, {
      ...event.body,
      id: foodEntryId,
      photoUrl: await uploadFoodEntryPhoto(event.body?.photo),
    });

    return httpResponse(result);
  } catch (e) {
    return httpError(e);
  }
});

main.use([adminMiddleware()]);
