import axios from 'axios';
import { useStore } from '@/shared/store';
import type { AxiosError } from 'axios';
import { createInfiniteQuery } from 'react-query-kit';
import { stringifyQueryParams } from '@/shared/service/api';
import { DailyCaloriesReport } from '../reporting.types';

type Response = {
  data: {
    data: {
      dailyCalories: DailyCaloriesReport[];
      nextCursor: string;
    };
  };
};
type Variables = { exceededCalorieLimit: boolean };

export const useDailyCalories = createInfiniteQuery<
  Response,
  Variables,
  AxiosError
>({
  primaryKey: 'daily-calories',
  queryFn: async ({
    queryKey: [primaryKey, { exceededCalorieLimit }],
    pageParam,
  }) => {
    return axios.get(
      `${primaryKey}?${stringifyQueryParams({
        exceededCalorieLimit,
        limit: 10,
        cursor: pageParam,
      })}`,
    );
  },
  getNextPageParam: (lastPage) => lastPage.data.data.nextCursor,
  useDefaultOptions() {
    const exceededCalorieLimit = useStore(
      (state) => state.reporting.dailyCalories.filters.exceededCalorieLimit,
    );

    return {
      variables: { exceededCalorieLimit },
    };
  },
});
