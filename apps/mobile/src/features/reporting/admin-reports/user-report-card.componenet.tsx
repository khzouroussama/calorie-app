import {
  Box,
  Button,
  Card,
  Icons,
  Pressable,
  Typography,
} from '@/design-system';
import { colors, spacing } from '@/design-system/theme';
import Animated, { Layout } from 'react-native-reanimated';
import { User } from '@/shared/hooks/use-admin-get-users-list';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useRef, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAdminGetUserReports } from './use-admin-get-user-reports';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { generateUserReportChartData } from '../reporting.helpers';

type UserReportCardProps = {
  user: User;
};

export const UserReportCard = ({ user }: UserReportCardProps) => {
  const { bottom } = useSafeAreaInsets();
  const modalRef = useRef<BottomSheetModal>(null);
  const { email, calorieLimit } = user;

  const { data } = useAdminGetUserReports({
    variables: {
      userId: user.id,
    },
  });

  const results = useMemo(
    () => data?.data?.data?.reports || [],
    [data?.data?.data?.reports],
  );

  const chartData = useMemo(() => {
    return generateUserReportChartData(results);
  }, [results]);

  return (
    <Animated.View layout={Layout.duration(200)}>
      <Pressable activeScale={0.98} onPress={() => modalRef.current?.present()}>
        <Card
          sx={{
            mx: 'md',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ row: true }}>
            <Box sx={{ flex: 1, row: true, gap: 'xs', alignItems: 'center' }}>
              <Icons.Users color={colors.primary500} strokeWidth={1.5} />
              <Typography variant="subheading" size="xxs" color="neutral600">
                {email}
              </Typography>
            </Box>
            <Box
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Box sx={{ row: true }}>
                  <Icons.Bolt
                    size={18}
                    strokeWidth={1.5}
                    color={colors.secondary400}
                  />
                  <Typography color="secondary400" variant="bold" size="xxs">
                    Daily Limit
                  </Typography>
                </Box>
                <Typography size="xxs" variant="bold" color="primary500">
                  {calorieLimit} Cal/24h
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'flex-end',
              width: '100%',
            }}
          >
            <Button
              variant="white"
              textProps={{
                size: 'xxs',
              }}
              icon={Icons.InfoCircle}
              onPress={() => modalRef.current?.present()}
            >
              Open user report
            </Button>
          </Box>
        </Card>
      </Pressable>
      <BottomSheetModal
        ref={modalRef}
        enableDismissOnClose
        backdropComponent={renderBackdropComponent}
        snapPoints={['75%']}
        footerComponent={(props) => (
          <BottomSheetFooter
            {...props}
            style={{ paddingHorizontal: spacing.lg }}
            bottomInset={bottom}
          >
            <Button
              variant="secondary"
              onPress={() => modalRef.current?.dismiss()}
            >
              Close
            </Button>
          </BottomSheetFooter>
        )}
      >
        <Box sx={{ alignItems: 'center' }}>
          <Typography
            variant="heading"
            size="md"
            style={{ textAlign: 'center', marginBottom: spacing.md }}
          >
            User Reports
          </Typography>

          <BarChart
            data={chartData}
            width={Dimensions.get('window').width - 48}
            height={256}
            verticalLabelRotation={90}
            yAxisSuffix=" cal"
            yAxisLabel=""
            chartConfig={{
              backgroundColor: colors.neutral100,
              backgroundGradientFrom: colors.neutral100,
              backgroundGradientTo: colors.neutral100,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              paddingVertical: 23,
              borderRadius: 8,
            }}
          />
          <Typography
            variant="heading"
            size="md"
            color="neutral700"
            style={{ textAlign: 'center', marginBottom: spacing.md }}
          >
            Avg. of Calories consumed by{'\n'}
            <Typography variant="bold" color="secondary300">
              {user.email}
            </Typography>
            {'\n'} over the last 7 days
          </Typography>

          <Typography variant="bold" size="xl" color="primary500">
            {(
              results.reduce((acc, report) => acc + report.totalOfCalories, 0) /
              7
            ).toFixed(2)}{' '}
            Calories
          </Typography>
        </Box>
      </BottomSheetModal>
    </Animated.View>
  );
};

const renderBackdropComponent = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
);
