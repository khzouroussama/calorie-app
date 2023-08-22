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
import { queryClient } from '@/shared/service/api';
import { useStoreActions } from '@/shared/store';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

export const SettingsScreen = () => {
  const { signOut } = useAuthenticator();
  const { reset } = useStoreActions();

  const logout = () => {
    queryClient.clear();
    reset();
    signOut();
  };

  return (
    <Screen sx={{ p: 'md' }}>
      <Card sx={{ mt: 'sm' }}>
        <Box sx={{ alignItems: 'center' }}>
          <Icons.Salad size={44} color={colors.primary500} strokeWidth={1.5} />
        </Box>
        <Typography style={{ textAlign: 'center' }}>
          My Daily Calorie limit
        </Typography>
        <Box sx={{ gap: 'md' }}>
          <TextField value="2100" />
          <Button variant="secondary" icon={Icons.Bolt}>
            Update
          </Button>
        </Box>
      </Card>

      <Card sx={{ mt: 'lg' }}>
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
