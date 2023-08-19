import {
  BodyParams,
  createHandler,
  httpError,
  httpResponse,
  schemaValidator,
} from '@calorie-app/http';
import { FoodEntryModel, createFoodEntry } from '../food-entry.model';
import { object, string } from 'yup';

type Params = BodyParams<Omit<FoodEntryModel, 'id'>>;

export const main = createHandler<Params>(async (event, context) => {
  try {
    const result = await createFoodEntry(
      event.requestContext.authorizer?.claims?.sub,
      {
        name: event.body.name,
        calories: event.body.calories,
        consumptionDate: new Date(event.body.consumptionDate).toISOString(),
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
      calories: string().required(),
      consumptionDate: string().required(),
    }),
  }),
]);
