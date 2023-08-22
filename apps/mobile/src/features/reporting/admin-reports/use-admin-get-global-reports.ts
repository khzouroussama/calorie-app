import axios from 'axios';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

export interface GlobalEntryCountModel {
  // this a date only string in the format of YYYY-MM-DD
  date: string;
  count?: number;
}

type Response = {
  data: {
    data: {
      reports: GlobalEntryCountModel[];
    };
  };
};
type Variables = null;

export const useAdminGetGlobalReports = createQuery<
  Response,
  Variables,
  AxiosError
>({
  primaryKey: 'admin/global-reports',
  queryFn: async ({ queryKey: [primaryKey] }) => {
    return axios.get(`${primaryKey}`);
  },
});
