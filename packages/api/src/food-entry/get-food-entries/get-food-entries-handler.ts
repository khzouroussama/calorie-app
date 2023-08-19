import { UserKeys } from '@/users/user.model';
import {
  QueryParams,
  createHandler,
  httpError,
  httpResponse,
  schemaValidator,
} from '@calorie-app/http';
import { object, string } from 'yup';
import { getFoodEntries } from '../food-entry.model';

type Params = QueryParams<{ dateFrom: string; DateTo: string }>;

export const main = createHandler<Params>(async (event, context) => {
  const userKeys = new UserKeys(event.requestContext.authorizer?.claims?.sub);

  try {
    const foodEntries = await getFoodEntries(userKeys);

    return httpResponse({ foodEntries });
  } catch (e) {
    return httpError(e);
  }
});

main.use([
  schemaValidator<Params>({
    queryStringParameters: object({
      dateFrom: string().optional().default(null),
      dateTo: string().optional().default(null),
    }),
  }),
]);
