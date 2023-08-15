import { useIsFirstAppStart } from '@/shared/hooks';
import { Text, View } from 'react-native';

import { Box, Pressable } from '@/design-system';

export const OnboardingScreen = () => {
  const [_, setFirstAppStart] = useIsFirstAppStart();
  return (
    <Box
      sx={{
        mt: 'xxxl',
      }}
    >
      <Pressable
        sx={{
          width: 200,
          bgColor: 'angry500',
          border: 1,
          borderColor: 'angry500',
        }}
      >
        <Text>Hello</Text>
      </Pressable>

      <Pressable
        sx={{
          mt: 'md',
          width: 200,
          bgColor: 'primary400',
          border: 1,
          borderColor: 'angry500',
        }}
        onPress={() => setFirstAppStart(false)}
      >
        <Text>Go to app</Text>
      </Pressable>
    </Box>
  );
};
