import { QueryParams, createHandler } from '@calorie-app/http';

type Params = QueryParams<{ dateFrom: string; DateTo: string }>;

export const main = createHandler<Params>(async (event, context) => {
  // const userKeys = new UserKeys(event.requestContext.identity.claims);

  console.log({ event });

  // try {
  //   const todos = await getTodos(userKeys);
  //
  //   return httpResponse({
  //     todos,
  //   });
  // } catch (e) {
  //   return httpError(e);
  // }
});
