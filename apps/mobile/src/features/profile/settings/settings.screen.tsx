import {
  Box,
  Button,
  Card,
  Icons,
  Screen,
  TextField,
  Typography,
} from '@/design-system';
import { colors } from '@/design-system/theme';
import { useIsAdmin } from '@/shared/hooks';
import { useStoreActions } from '@/shared/store';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { useQueryClient } from '@tanstack/react-query';

import axios from 'axios';
import { useMe } from '../use-me';
import { useUpdateDailyLimit } from './use-update-daily-limit';
import { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';

export const SettingsScreen = () => {
  const { data, isLoading: isProfileLoading, refetch, isRefetching } = useMe();
  const userData = data?.data?.data?.user;
  const [dailyLimit, setDailyLimit] = useState<number>(0);

  const { mutate: updateDailyLimit, isLoading: isUpdatingDailyLimit } =
    useUpdateDailyLimit();

  const isLoading = isProfileLoading || isUpdatingDailyLimit || isRefetching;

  const isAdmin = useIsAdmin();
  const { signOut } = useAuthenticator();
  const { reset } = useStoreActions();
  const queryClient = useQueryClient();

  const logout = () => {
    axios.defaults.headers.common.Authorization = undefined;
    queryClient.clear();
    reset();
    signOut();
  };

  const handleUpdateDailyLimit = () => {
    updateDailyLimit(
      { newLimit: dailyLimit },
      {
        onSuccess: () => {
          showMessage({
            message: 'Daily limit updated',
            type: 'success',
          });

          queryClient.invalidateQueries({
            queryKey: ['me'],
          });

          queryClient.invalidateQueries({
            queryKey: ['daily-calories'],
          });
        },
        onError: () => {
          refetch();
          showMessage({
            message: 'Something went wrong',
            type: 'danger',
          });
        },
      },
    );
  };

  useEffect(() => {
    setDailyLimit(userData?.calorieLimit || 0);
  }, [userData]);

  return (
    <Screen sx={{ p: 'md' }}>
      <Card>
        <Typography style={{ textAlign: 'center' }}>
          {userData?.email || ''}
        </Typography>
      </Card>

      {!isAdmin && (
        <Card sx={{ mt: 'sm' }}>
          <Box sx={{ alignItems: 'center' }}>
            <Icons.Salad
              size={44}
              color={colors.primary500}
              strokeWidth={1.5}
            />
          </Box>
          <Typography style={{ textAlign: 'center' }}>
            My Daily Calorie limit
          </Typography>
          <Box
            sx={{ gap: 'md' }}
            style={{
              opacity: isLoading ? 0.5 : 1,
            }}
            pointerEvents={isLoading ? 'none' : 'auto'}
          >
            <TextField
              value={String(dailyLimit)}
              keyboardType="numeric"
              onChangeText={(txt) => setDailyLimit(+txt)}
            />
            <Button
              disabled={isLoading}
              loading={isLoading}
              variant="secondary"
              icon={Icons.Bolt}
              onPress={handleUpdateDailyLimit}
            >
              Update
            </Button>
          </Box>
        </Card>
      )}

      <Card sx={{ mt: 'sm' }}>
        <Typography style={{ textAlign: 'center' }}>
          Want to logout ?
        </Typography>
        <Button
          onPress={logout}
          icon={Icons.Logout}
          variant="white"
          sx={{ width: '100%' }}
        >
          Logout
        </Button>
      </Card>
    </Screen>
  );
};
