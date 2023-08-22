import { Box, Screen, Typography } from '@/design-system';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { useCallback, useMemo } from 'react';
import { spacing } from '@/design-system/theme';
import Animated, { Layout } from 'react-native-reanimated';
import type { DailyCaloriesReport } from '../reporting.types';
import { useAdminGetUsersList } from '@/shared/hooks';
import { UserReportCard } from './user-report-card.componenet';
import { AdminReportingHeader } from './admin-reporting-header.component';

export const AdminReportsScreen = () => {
  const {
    data,
    status,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useAdminGetUsersList();

  const users = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((item) => item.data.data.users);
  }, [data?.pages]);

  const renderItem = useCallback(
    ({ item }) => <UserReportCard user={item} />,
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
        <AdminReportingHeader />
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
          data={users}
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
