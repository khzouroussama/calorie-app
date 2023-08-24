import { Box, Empty, Screen, Typography } from '@/design-system';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { useFoodEntries } from './use-food-entries';
import { useCallback, useMemo } from 'react';
import { FoodEntryCard } from './offer-entry-card/offer-entry-card.component';
import { spacing } from '@/design-system/theme';
import type { FoodEntry } from '../food-entries.types';
import { FoodEntriesFilter } from './food-entries-filter';
import { FoodEntriesHeader } from './food-entries-header.component';
import Animated, { Layout } from 'react-native-reanimated';
import { AddFoodEntryFabButton } from './add-food-entry-button.component';

export const FoodEntriesScreen = () => {
  const {
    data,
    status,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useFoodEntries();

  const entries = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((item) => item.data.data.foodEntries);
  }, [data?.pages]);

  const renderItem = useCallback(
    ({ item }) => <FoodEntryCard foodEntry={item} />,
    [],
  );

  return (
    <Screen>
      <Box
        sx={{
          my: 'sm',
          px: 'md',
          gap: 'sm',
        }}
      >
        <FoodEntriesHeader />
        <FoodEntriesFilter />
      </Box>
      {status === 'loading' ? (
        <Box sx={{ flex: 1 }}>
          <ActivityIndicator />
        </Box>
      ) : status === 'error' ? (
        <Box sx={{ flex: 1, p: 'md' }}>
          <Typography>An Error happned</Typography>
        </Box>
      ) : (
        <Animated.FlatList<FoodEntry>
          data={entries}
          keyExtractor={(item) => item.consumptionDate}
          itemLayoutAnimation={Layout.duration(400)}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: spacing.xxl,
          }}
          ItemSeparatorComponent={() => <Box sx={{ py: 'xxs' }} />}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={Empty}
          ListFooterComponent={
            isFetchingNextPage ? (
              <Box sx={{ m: 'lg' }}>
                <ActivityIndicator />
              </Box>
            ) : null
          }
        />
      )}
      <AddFoodEntryFabButton />
    </Screen>
  );
};
