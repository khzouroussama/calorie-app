import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { queryClient } from '@/shared/service/api';

type Variables = {
  id: string;
  userId: string;
};
type Response = {
  success: boolean;
};

export const useAdminDeleteFoodEntry = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    axios
      .delete(`admin/food-entries/${variables.userId}_${variables.id}`)
      .then((response) => response.data),
  onSuccess: () => {
    showMessage({
      message: 'Food entry deleted successfully',
      type: 'info',
    });
    queryClient.invalidateQueries({
      queryKey: ['admin/food-entries'],
    });

    queryClient.invalidateQueries({
      queryKey: ['admin/user-reports'],
    });

    queryClient.invalidateQueries({
      queryKey: ['admin/global-reports'],
    });
  },
  onError: () => {
    showMessage({
      message: 'Something went wrong',
      type: 'danger',
    });
  },
});
