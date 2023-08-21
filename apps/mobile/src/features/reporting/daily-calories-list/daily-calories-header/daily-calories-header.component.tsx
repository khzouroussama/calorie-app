import { Box, Switch, Typography } from '@/design-system';
import { useStore, useStoreActions } from '@/shared/store';
import { curry } from 'ramda';

export const DailyCaloriesHeader = () => {
  const exceededCalorieLimit = useStore(
    (state) => state.reporting.dailyCalories.filters.exceededCalorieLimit,
  );
  const { onUserDailyCaloriesFilterChange } = useStoreActions();

  return (
    <Box sx={{ row: true, alignItems: 'center', gap: 'sm' }}>
      <Switch
        value={exceededCalorieLimit}
        onValueChange={curry(onUserDailyCaloriesFilterChange)(
          'exceededCalorieLimit',
        )}
      />
      <Typography size="xs">Display days exceeding calorie limit</Typography>
    </Box>
  );
};
