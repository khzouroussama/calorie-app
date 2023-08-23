import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import axios from 'axios';

type Variables = {
  newLimit: number;
};
type Response = {
  success: boolean;
};

export const useUpdateDailyLimit = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    axios
      .put(`update-daily-limit`, variables)
      .then((response) => response.data),
});
