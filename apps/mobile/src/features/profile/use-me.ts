import axios from 'axios';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { UserModal } from './profile.types';
import { UserCalorieCountModel } from '../reporting';

type Response = {
  data: {
    data: {
      user: UserModal;
      reports: UserCalorieCountModel[];
    };
  };
};
type Variables = undefined;

export const useMe = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'me',
  queryFn: async ({ queryKey: [primaryKey] }) => {
    return axios.get(`${primaryKey}`);
  },
});
