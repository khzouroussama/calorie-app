import { stringifyQueryParams } from '@/shared/service/api';
import axios from 'axios';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

export interface UserCalorieCountModel {
  userId: string;
  // a date only string in the format of YYYY-MM-DD
  date: string;
  totalOfCalories?: number;
}

type Response = {
  data: {
    data: {
      reports: UserCalorieCountModel[];
    };
  };
};
type Variables = {
  userId: string;
};

export const useAdminGetUserReports = createQuery<
  Response,
  Variables,
  AxiosError
>({
  primaryKey: 'admin/user-reports',
  queryFn: async ({ queryKey: [primaryKey, { userId }] }) => {
    return axios.get(
      `${primaryKey}?${stringifyQueryParams({
        userId,
      })}`,
    );
  },
});
