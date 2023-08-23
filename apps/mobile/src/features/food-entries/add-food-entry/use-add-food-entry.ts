import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import axios from 'axios';
import { FoodEntry } from '../food-entries.types';
import { FoodEntryFormData } from '../food-entry-form.component';

type Variables = FoodEntryFormData;
type Response = FoodEntry;

export const useAddFoodEntry = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    return axios
      .post('food-entries', variables)
      .then((response) => response.data);
  },
});
