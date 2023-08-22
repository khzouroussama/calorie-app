import axios from 'axios';
import type { AxiosError } from 'axios';
import { createInfiniteQuery } from 'react-query-kit';
import { stringifyQueryParams } from '@/shared/service/api';

export type User = {
  id: string;
  calorieLimit: number;
  email: string;
};

type Response = {
  data: {
    data: {
      users: User[];
      nextCursor: string;
    };
  };
};
type Variables = null;

export const useAdminGetUsersList = createInfiniteQuery<
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
