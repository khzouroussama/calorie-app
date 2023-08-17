import {
  BodyParams,
  createProtectedHandler,
  httpError,
  httpResponse,
} from '@calorie-app/http';
import { schemaValidator } from '@calorie-app/http';
import { FoodEntryModel, createFoodEntry } from '../food-entry.model';
import { object, string } from 'yup';

type Params = BodyParams<Omit<FoodEntryModel, 'id'>>;

export const main = createProtectedHandler<Params>(async (event, context) => {
  try {
    const result = await createFoodEntry(context.user.id, {
      name: event.body.name,
      calories: event.body.calories,
    });

    return httpResponse(result);
  } catch (e) {
    return httpError(e);
  }
});

main.use([
  schemaValidator<Params>({
    body: object({
      name: string().required(),
      calories: string().required(),
    }),
  }),
]);
