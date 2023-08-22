import {
  PaginationParams,
  QueryParams,
  adminMiddleware,
  createHandler,
  httpError,
  httpResponse,
  schemaValidator,
} from '@calorie-app/http';
import { number, object, string } from 'yup';
import { getFoodEntries } from '@/food-entry/food-entry.model';

type Params = QueryParams<{ dateFrom: string; dateTo: string }> &
  PaginationParams;

export const main = createHandler<Params>(async (event, context) => {
  const { cursor, limit, dateTo, dateFrom } = event.queryStringParameters;

  try {
    const { foodEntries, nextCursor } = await getFoodEntries(cursor, limit, {
      dateFrom,
      dateTo,
    });

    return httpResponse({ foodEntries, nextCursor });
  } catch (e) {
    return httpError(e);
  }
});

main.use([
  adminMiddleware(),
  schemaValidator<Params>({
    queryStringParameters: object({
      dateFrom: string().nullable().optional().default(null),
      dateTo: string().nullable().optional().default(null),
      limit: number().nullable().optional().integer().positive().default(10),
      cursor: string().nullable().optional().default(null),
    }),
  }),
]);
