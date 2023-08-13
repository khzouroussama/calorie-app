import { createHandler } from '@calorie-app/http';

export const main = createHandler<any>(async (event, context) => {
  console.log('event', JSON.stringify(process.env, null, 2));
});
