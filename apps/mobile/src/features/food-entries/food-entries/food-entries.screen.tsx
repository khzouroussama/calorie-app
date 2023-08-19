import { Box, Icons, Pressable, Screen, Typography } from '@/design-system';
import { ActivityIndicator, FlatList } from 'react-native';
import { useFoodEntries } from './use-food-entries';
import { useCallback } from 'react';
import { FoodEntryCard } from './offer-entry-card.component';
import { colors, spacing } from '@/design-system/theme';
import { useNavigation } from '@react-navigation/native';

export const FoodEntriesScreen = () => {
  const navigation = useNavigation();

  // const { data, isLoading, isError } = useFoodEntries();
  const data = [{}];
  const isLoading = true;

  const renderItem = useCallback(
    ({ item }) => <FoodEntryCard foodEntry={item} />,
    [],
  );

  return (
    <Screen sx={{ px: 'md' }}>
      <Box sx={{ row: true, my: 'sm', alignItems: 'center', gap: 'sm' }}>
        <Typography variant="subheading" color="primary500">
          // TODO: Filters
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ flex: 1 }}>
          <ActivityIndicator />
        </Box>
      ) : (
        <FlatList data={data} renderItem={null} />
      )}
      <AddFoodEntryFabButton
        onPress={() => navigation.navigate('UserAddFoodEntry')}
      />
    </Screen>
  );
};

const AddFoodEntryFabButton = ({ onPress }) => (
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
