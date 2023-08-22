import { Box, Icons, Pressable } from '@/design-system';
import { colors, spacing } from '@/design-system/theme';
import { useIsAdmin } from '@/shared/hooks';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

export const AddFoodEntryFabButton = () => {
  const navigation = useNavigation();
  const isAdmin = useIsAdmin();

  const onPress = useCallback(() => {
    if (isAdmin) {
      navigation.navigate('AdminAddFoodEntry');
    } else {
      navigation.navigate('UserAddFoodEntry');
    }
  }, [isAdmin, navigation]);

  return (
    <Box sx={{ position: 'absolute', bottom: spacing.lg, right: spacing.lg }}>
      <Pressable onPress={onPress}>
        <Box
          sx={{
            borderRadius: 100,
            width: 52,
            height: 52,
            bgColor: 'primary500',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icons.Plus size={32} color={colors.neutral100} strokeWidth={2} />
        </Box>
      </Pressable>
    </Box>
  );
};
