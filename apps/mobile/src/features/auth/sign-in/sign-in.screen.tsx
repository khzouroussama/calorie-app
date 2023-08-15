import { Box, Pressable, Typography } from '@/design-system';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

export const SignInScreen = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);
  return (
    <Box sx={{ m: 'xxxl' }}>
      <Typography variant="heading">login</Typography>
      <Pressable onPress={signOut}>
        <Typography variant="bold">logout</Typography>
      </Pressable>
    </Box>
  );
};
