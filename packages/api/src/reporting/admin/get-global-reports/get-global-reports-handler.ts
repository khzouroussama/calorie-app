import { getAdminGlobalReports } from '@/reporting/aggregation.model';
import {
  QueryParams,
  adminMiddleware,
  createHandler,
  httpError,
  httpResponse,
} from '@calorie-app/http';

type Params = QueryParams<{}>;

export const main = createHandler<Params>(async (event, context) => {
  try {
    const { reports } = await getAdminGlobalReports();

    return httpResponse({ reports });
  } catch (e) {
    return httpError(e);
  }
});

main.use([adminMiddleware()]);
