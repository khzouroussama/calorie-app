import { Box, Card, Typography } from '@/design-system';
import { addAlpha, colors } from '@/design-system/theme';
import { useMe } from '@/features/profile';
import { ActivityIndicator } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

export const FoodEntriesHeader = () => {
  const { data, isLoading } = useMe();

  const { user, reports } = data?.data?.data || {};
  const todaysReport = (reports ?? []).find(
    (item) => item.date === new Date().toISOString().split('T')[0],
  ) ?? {
    totalOfCalories: 0,
  };

  return (
    <Card sx={{ row: true, justifyContent: 'space-between' }}>
      <Box sx={{ justifyContent: 'center', gap: 'xxxs' }}>
        <Typography variant="bold" size="sm" color="neutral700">
          My daily goal
        </Typography>
        <Typography variant="bold" size="xl" color="primary500">
          {todaysReport.totalOfCalories} Cal
        </Typography>
        <Typography variant="default" size="xxs">
          Limit: {user?.calorieLimit || 0} Cal
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ProgressChart
            hideLegend
            data={{
              labels: ['Consumed'], // optional
              data: [
                (todaysReport?.totalOfCalories || 0) / user?.calorieLimit || 1,
              ],
            }}
            width={90}
            height={90}
            strokeWidth={14}
            radius={32}
            chartConfig={{
              backgroundColor: colors.neutral100,
              backgroundGradientFrom: colors.neutral100,
              backgroundGradientTo: colors.neutral100,
              color: (opacity = 1) => addAlpha(colors.primary600, opacity),
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        )}
      </Box>
    </Card>
  );
};
