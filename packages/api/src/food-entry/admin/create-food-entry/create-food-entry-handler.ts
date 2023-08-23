import { uploadFoodEntryPhoto } from '@/food-entry/food-entry.helpers';
import { FoodEntryModel, createFoodEntry } from '@/food-entry/food-entry.model';
import {
  BodyParams,
  PathParams,
  adminMiddleware,
  createHandler,
  httpError,
  httpResponse,
  schemaValidator,
} from '@calorie-app/http';
import { object, string } from 'yup';

type Params = BodyParams<Omit<FoodEntryModel & { photo: any }, 'id'>> &
  PathParams<{ id: string }>;

export const main = createHandler<Params>(async (event, context) => {
  try {
    const result = await createFoodEntry(event.pathParameters.id, {
      id: new Date(event.body.consumptionDate).toISOString(),
      name: event.body.name,
      calories: event.body.calories,
      consumptionDate: new Date(event.body.consumptionDate).toISOString(),
      photoUrl: await uploadFoodEntryPhoto(event.body?.photo),
    });

    return httpResponse(result);
  } catch (e) {
    return httpError(e);
  }
});

main.use([
  adminMiddleware(),
  schemaValidator<Params>({
    body: object({
      name: string().required(),
      calories: string().required(),
      consumptionDate: string().required(),
      photo: object({
        uri: string().required(),
        name: string().required(),
        type: string().optional(),
      })
        .optional()
        .nullable(),
    }),
  }),
]);
