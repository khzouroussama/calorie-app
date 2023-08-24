import { Box, Empty, Icons, Screen, Typography } from '@/design-system';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { useCallback, useMemo } from 'react';
import { colors, spacing } from '@/design-system/theme';
import Animated, { Layout } from 'react-native-reanimated';
import { useDailyCalories } from './use-daily-calories';
import { DailyCaloriesCard } from './daily-calories-card';
import type { DailyCaloriesReport } from '../reporting.types';
import { DailyCaloriesHeader } from './daily-calories-header';

export const DailyCaloriesScreen = () => {
  const {
    data,
    status,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useDailyCalories();

  const reports = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((item) => item.data.data.dailyCalories);
  }, [data?.pages]);

  const renderItem = useCallback(
    ({ item }) => <DailyCaloriesCard dailyCaloriesItem={item} />,
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
        <DailyCaloriesHeader />
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
        <Animated.FlatList<DailyCaloriesReport>
          data={reports}
          keyExtractor={(item) => item.date}
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
    </Screen>
  );
};
