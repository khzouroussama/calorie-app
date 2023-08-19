import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import axios from 'axios';
import { AddFoodEntryFormData } from './add-food-entry.screen';
import { FoodEntry } from '../food-entries.types';

type Variables = AddFoodEntryFormData;
type Response = FoodEntry;

export const useAddFoodEntry = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    axios.post('food-entries', variables).then((response) => response.data),
});
