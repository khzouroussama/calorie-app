import axios from 'axios';
import { useStore } from '@/shared/store';
import type { AxiosError } from 'axios';
import { createInfiniteQuery, createQuery } from 'react-query-kit';
import { FoodEntry } from '../food-entries.types';
import { stringifyQueryParams } from '@/shared/service/api';

type Response = {
  data: {
    data: {
      foodEntries: FoodEntry[];
      nextCursor: string;
    };
  };
};
type Variables = { dateFrom: string; dateTo: string };

export const useFoodEntries = createInfiniteQuery<
  Response,
  Variables,
  AxiosError
>({
  primaryKey: 'food-entries',
  queryFn: async ({
    queryKey: [primaryKey, { dateFrom, dateTo }],
    pageParam,
  }) => {
    return axios.get(
      `${primaryKey}?${stringifyQueryParams({
        dateFrom,
        dateTo,
        limit: 10,
        cursor: pageParam,
      })}`,
    );
  },
  getNextPageParam: (lastPage) => lastPage.data.data.nextCursor,
  useDefaultOptions() {
    const dateFrom = useStore((state) => state.foodEntries.filters.dateFrom);
    const dateTo = useStore((state) => state.foodEntries.filters.dateTo);

    return {
      variables: {
        dateFrom: dateFrom?.toISOString(),
        dateTo: dateTo?.toISOString(),
      },
    };
  },
});
