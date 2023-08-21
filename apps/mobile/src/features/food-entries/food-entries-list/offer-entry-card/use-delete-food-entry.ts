import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { queryClient } from '@/shared/service/api';

type Variables = {
  id: string;
};
type Response = {
  success: boolean;
};

export const useDeleteFoodEntry = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    axios
      .delete(`food-entries/${variables.id}`)
      .then((response) => response.data),
  onSuccess: () => {
    showMessage({
      message: 'Food entry deleted successfully',
      type: 'info',
    });
    queryClient.invalidateQueries({
      queryKey: ['food-entries'],
    });
  },
  onError: () => {
    showMessage({
      message: 'Something went wrong',
      type: 'danger',
    });
  },
});
