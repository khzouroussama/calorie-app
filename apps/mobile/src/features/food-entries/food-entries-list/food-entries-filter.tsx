import { Box, Button, DateTimeField, Icons } from '@/design-system';

import { useStore, useStoreActions } from '@/shared/store';
import { curry } from 'ramda';

export const FoodEntriesFilter = () => {
  const { dateFrom, dateTo } = useStore((state) => state.foodEntries.filters);
  const { onUserFoodEntryFilterChange, onUserFoodEntryFilterReset } =
    useStoreActions();

  return (
    <Box sx={{ row: true, gap: 'sm' }}>
      <Box sx={{ flex: 1 }}>
        <DateTimeField
          label={null}
          value={dateFrom}
          placeholder="from"
          mode="datetime"
          onChange={curry(onUserFoodEntryFilterChange)('dateFrom')}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <DateTimeField
          label={null}
          placeholder="To"
          value={dateTo}
          mode="datetime"
          onChange={curry(onUserFoodEntryFilterChange)('dateTo')}
        />
      </Box>
      <Box>
        <Button
          variant="white"
          icon={Icons.Ban}
          onPress={onUserFoodEntryFilterReset}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};
