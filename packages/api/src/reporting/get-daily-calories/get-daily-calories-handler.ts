import {
  PaginationParams,
  QueryParams,
  createHandler,
  httpError,
  httpResponse,
  schemaValidator,
} from '@calorie-app/http';
import { boolean, number, object, string } from 'yup';
import { getDailyCalories } from '../aggregation.model';

type Params = QueryParams<{
  exceededCalorieLimit: 'true' | ' false' | undefined;
}> &
  PaginationParams;

export const main = createHandler<Params>(async (event, context) => {
  const userId = event.requestContext.authorizer?.claims?.sub;
  const { cursor, limit, exceededCalorieLimit } = event.queryStringParameters;

  try {
    const { dailyCalories, nextCursor } = await getDailyCalories(
      userId,
      cursor,
      limit,
      {
        exceededCalorieLimit: exceededCalorieLimit
          ? exceededCalorieLimit.toLowerCase() === 'true'
          : false,
      },
    );

    return httpResponse({ dailyCalories, nextCursor });
  } catch (e) {
    return httpError(e);
  }
});

main.use([
  schemaValidator<Params>({
    queryStringParameters: object({
      exceededCalorieLimit: boolean().nullable().optional().default(false),
      limit: number().nullable().optional().integer().positive().default(10),
      cursor: string().nullable().optional().default(null),
    }),
  }),
]);
