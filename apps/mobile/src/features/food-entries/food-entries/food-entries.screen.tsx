import { Box, Icons, Pressable, Screen, Typography } from '@/design-system';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useFoodEntries } from './use-food-entries';
import { useCallback } from 'react';
import { FoodEntryCard } from './offer-entry-card.component';
import { colors, spacing } from '@/design-system/theme';
import { useNavigation } from '@react-navigation/native';
import type { FoodEntry } from '../food-entries.types';

export const FoodEntriesScreen = () => {
  const navigation = useNavigation();
  const { data, status, refetch, isRefetching } = useFoodEntries();

  const renderItem = useCallback(
    ({ item }) => <FoodEntryCard foodEntry={item} />,
    [],
  );

  return (
    <Screen sx={{ px: 'md' }}>
      <Box sx={{ row: true, my: 'sm', alignItems: 'center', gap: 'sm' }}>
        <Typography variant="subheading" color="primary500">
          TODO: Filters
        </Typography>
      </Box>

      {status === 'loading' ? (
        <Box sx={{ flex: 1 }}>
          <ActivityIndicator />
        </Box>
      ) : status === 'error' ? (
        <Box sx={{ flex: 1 }}>
          <Typography>An Error happned</Typography>
        </Box>
      ) : (
        <FlatList<FoodEntry>
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Box sx={{ py: 'xs' }} />}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        />
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
