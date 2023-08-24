import {
  BodyParams,
  createHandler,
  httpError,
  httpResponse,
  schemaValidator,
} from '@calorie-app/http';
import { FoodEntryModel, createFoodEntry } from '../food-entry.model';
import { number, object, string } from 'yup';
import { uploadFoodEntryPhoto } from '../food-entry.helpers';

type Params = BodyParams<Omit<FoodEntryModel, 'id'>>;

export const main = createHandler<Params>(async (event) => {
  try {
    const result = await createFoodEntry(
      event.requestContext.authorizer?.claims?.sub,
      {
        id: new Date(event.body.consumptionDate).toISOString(),
        name: event.body.name,
        calories: event.body.calories,
        consumptionDate: new Date(event.body.consumptionDate).toISOString(),
        photo: await uploadFoodEntryPhoto(event.body?.photo),
      },
    );

    return httpResponse(result);
  } catch (e) {
    return httpError(e);
  }
});

main.use([
  schemaValidator<Params>({
    body: object({
      name: string().required(),
      calories: number().required(),
      consumptionDate: string().required(),
      photo: object({
        uri: string().optional().nullable(),
        name: string().optional().nullable(),
        type: string().optional().nullable(),
      })
        .optional()
        .nullable(),
    }),
  }),
]);
