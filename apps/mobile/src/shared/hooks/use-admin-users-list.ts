import axios from 'axios';
import type { AxiosError } from 'axios';
import { createInfiniteQuery } from 'react-query-kit';
import { stringifyQueryParams } from '@/shared/service/api';

type Response = {
  data: {
    data: {
      users: {
        id: string;
        name: string;
        calorieLimit: number;
        email: string;
      }[];
      nextCursor: string;
    };
  };
};
type Variables = null;

export const useAdminListOfUsers = createInfiniteQuery<
  Response,
  Variables,
  AxiosError
>({
  primaryKey: 'admin/users',
  queryFn: async ({ queryKey: [primaryKey], pageParam }) => {
    return axios.get(
      `${primaryKey}?${stringifyQueryParams({
        limit: 3,
        cursor: pageParam,
      })}`,
    );
  },
  getNextPageParam: (lastPage) => lastPage.data.data.nextCursor,
});
