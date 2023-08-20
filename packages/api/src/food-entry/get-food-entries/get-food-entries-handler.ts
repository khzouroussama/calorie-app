import { UserKeys } from '@/users/user.model';
import {
  PaginationParams,
  QueryParams,
  createHandler,
  httpError,
  httpResponse,
  schemaValidator,
} from '@calorie-app/http';
import { number, object, string } from 'yup';
import { getFoodEntries } from '../food-entry.model';

type Params = QueryParams<{ dateFrom: string; DateTo: string }>;

export const main = createHandler<Params & PaginationParams>(
  async (event, context) => {
    const userKeys = new UserKeys(event.requestContext.authorizer?.claims?.sub);
    const { cursor, limit } = event.queryStringParameters;

    try {
      const { foodEntries, nextCursor } = await getFoodEntries(
        userKeys,
        cursor,
        limit,
      );

      return httpResponse({ foodEntries, nextCursor });
    } catch (e) {
      return httpError(e);
    }
  },
);

main.use([
  schemaValidator<Params>({
    queryStringParameters: object({
      dateFrom: string().optional().default(null),
      dateTo: string().optional().default(null),
      cursor: string().optional().default(null),
      limit: number().integer().positive().optional().default(10),
    }),
  }),
]);
