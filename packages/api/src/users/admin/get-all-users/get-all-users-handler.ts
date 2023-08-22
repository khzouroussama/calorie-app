import { getAllUsers } from '@/users/user.model';
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

type Params = QueryParams<{}> & PaginationParams;

export const main = createHandler<Params>(async (event, context) => {
  const { cursor, limit } = event.queryStringParameters;

  try {
    const { users, nextCursor } = await getAllUsers(cursor, limit);

    return httpResponse({ users, nextCursor });
  } catch (e) {
    return httpError(e);
  }
});

main.use([
  adminMiddleware(),
  schemaValidator<Params>({
    queryStringParameters: object({
      limit: number().nullable().optional().integer().positive().default(10),
      cursor: string().nullable().optional().default(null),
    }),
  }),
]);
