import axios from 'axios';
import { useStore } from '@/shared/store';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { FoodEntry } from '../food-entries.types';

type Response = FoodEntry[];
type Variables = { dateFrom: string; dateTo: string };

export const useFoodEntries = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'food-entries',
  queryFn: async ({ queryKey: [primaryKey, { dateFrom, dateTo }] }) => {
    const {
      data: { foodEntries },
    } = await axios.get(`${primaryKey}?dateFrom=${dateFrom}&dateTo=${dateTo}`);

    return foodEntries;
  },
  useDefaultOptions() {
    const { dateTo, dateFrom } = useStore((state) => state.foodEntries.filters);

    return {
      variables: {
        dateFrom,
        dateTo,
      },
    };
  },
});
