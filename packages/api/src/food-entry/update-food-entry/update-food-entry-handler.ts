// import {
//   BodyParams,
// createHandler,
//   PathParams,
//   httpError,
//   httpResponse,
// } from '@calorie-app/http';
// import {
//   FoodEntry,
//   FoodEntryModel,
//   updateFoodEntry,
// } from '../food-entry.model';
// import { UserKeys } from '@/users/user.model';
//
// type Params = PathParams<{ id: string }> &
//   BodyParams<{ completed: FoodEntryModel['id'] }>;
//
// export const main = createHandler<Params>(async (event, context) => {
//   const userKeys = new UserKeys(context.user.id);
//   const foodEntryKeys = new FoodEntry(userKeys, event.pathParameters.id);
//
//   try {
//     const result = await updateFoodEntry(foodEntryKeys, event.body.completed);
//
//     return httpResponse(result);
//   } catch (e) {
//     return httpError(e);
//   }
// });
//
export const main = (event, context) => {
  return null;
};
