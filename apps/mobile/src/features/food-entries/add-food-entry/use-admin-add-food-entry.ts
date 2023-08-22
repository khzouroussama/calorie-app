import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import axios from 'axios';
import { FoodEntry } from '../food-entries.types';
import { FoodEntryFormData } from '../food-entry-form.component';

type Variables = FoodEntryFormData;
type Response = FoodEntry;

export const useAdminAddFoodEntry = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    axios
      .post(`admin/food-entries/${variables.id}`, variables)
      .then((response) => response.data),
});
