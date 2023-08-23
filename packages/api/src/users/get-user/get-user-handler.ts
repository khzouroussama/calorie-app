import {
  QueryParams,
  createHandler,
  httpError,
  httpResponse,
} from '@calorie-app/http';
import { UserKeys, getUser } from '@/users/user.model';
import { getUserReports } from '@/reporting/aggregation.model';

type Params = QueryParams<{}>;

export const main = createHandler<Params>(async (event, context) => {
  const userId = event.requestContext.authorizer?.claims?.sub;

  try {
    const user = await getUser(new UserKeys(userId));
    const reports = await getUserReports(userId);

    return httpResponse({ user, reports });
  } catch (e) {
    return httpError(e);
  }
});
