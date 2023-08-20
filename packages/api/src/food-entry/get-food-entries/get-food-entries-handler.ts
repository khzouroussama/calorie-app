import {
  PaginationParams,
  QueryParams,
  createHandler,
  httpError,
  httpResponse,
  schemaValidator,
} from '@calorie-app/http';
import { UserKeys } from '@/users/user.model';
import { number, object, string } from 'yup';
import { getFoodEntries } from '../food-entry.model';

type Params = QueryParams<{ dateFrom: string; dateTo: string }> &
  PaginationParams;

export const main = createHandler<Params>(async (event, context) => {
  const userKeys = new UserKeys(event.requestContext.authorizer?.claims?.sub);
  const { cursor, limit, dateTo, dateFrom } = event.queryStringParameters;

  try {
    const { foodEntries, nextCursor } = await getFoodEntries(
      userKeys,
      cursor,
      limit,
      { dateFrom, dateTo },
    );

    return httpResponse({ foodEntries, nextCursor });
  } catch (e) {
    return httpError(e);
  }
});

main.use([
  schemaValidator<Params>({
    queryStringParameters: object({
      dateFrom: string().nullable().optional().default(null),
      dateTo: string().nullable().optional().default(null),
      limit: number().nullable().optional().integer().positive().default(10),
      cursor: string().nullable().optional().default(null),
    }),
  }),
]);
