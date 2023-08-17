import { Box, Button, TextField, Typography } from '@/design-system';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

export const FoodEntriesScreen = () => {
  const { signOut } = useAuthenticator();
  return (
    <Box sx={{ mt: 'xxxl' }}>
      <Typography>hellp</Typography>
      <Box sx={{ m: 'sm' }}>
        <TextField label="Hellp" status="error" helper="Herer lekrj " />
        <Button size="normal" variant="primary" sx={{ m: 'md' }}>
          Hellp
        </Button>
        <Button variant="secondary" sx={{ m: 'md' }}>
          Hellp
        </Button>
        <Button variant="tertiary" sx={{ m: 'md' }}>
          Hellp
        </Button>

        <Button onPress={signOut} variant="white" sx={{ m: 'md' }}>
          Sign ou
        </Button>
      </Box>
    </Box>
  );
};
