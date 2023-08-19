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
import { useAuthenticator } from '@aws-amplify/ui-react-native';

export const SettingsScreen = () => {
  const { signOut } = useAuthenticator();
  return (
    <Screen sx={{ p: 'md' }}>
      <Card>
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

      <Card>
        <Typography style={{ textAlign: 'center' }}>
          Want to logout ?
        </Typography>
        <Button
          onPress={signOut}
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
