import { Box, Icons, Pressable, Screen, Typography } from '@/design-system';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { useFoodEntries } from './use-food-entries';
import { useCallback, useMemo } from 'react';
import { FoodEntryCard } from './offer-entry-card.component';
import { colors, spacing } from '@/design-system/theme';
import { useNavigation } from '@react-navigation/native';
import type { FoodEntry } from '../food-entries.types';
import { FoodEntriesFilter } from './food-entries-filter';
import { FoodEntriesHeader } from './food-entries-header.component';
import Animated, { Layout } from 'react-native-reanimated';

export const FoodEntriesScreen = () => {
  const navigation = useNavigation();
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
        <Box sx={{ flex: 1 }}>
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
          ListFooterComponent={
            isFetchingNextPage ? (
              <Box sx={{ m: 'lg' }}>
                <ActivityIndicator />
              </Box>
            ) : null
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
