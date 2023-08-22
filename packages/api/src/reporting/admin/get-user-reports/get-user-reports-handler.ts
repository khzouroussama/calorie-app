import { getUserReports } from '@/reporting/aggregation.model';
import {
  QueryParams,
  adminMiddleware,
  createHandler,
  httpError,
  httpResponse,
} from '@calorie-app/http';

type Params = QueryParams<{
  userId: string;
}>;

export const main = createHandler<Params>(async (event, context) => {
  const userId = event.queryStringParameters.userId;
  try {
    const { reports } = await getUserReports(userId);

    return httpResponse({ reports });
  } catch (e) {
    return httpError(e);
  }
});

main.use([adminMiddleware()]);
