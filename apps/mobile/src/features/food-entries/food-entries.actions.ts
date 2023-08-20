import { StateCreator } from 'zustand';

import type { Store, StoreMiddleware } from '@/shared/store';
import { showMessage } from 'react-native-flash-message';

interface FoodEntriesSliceActions {
  onUserFoodEntryFilterChange: (
    filter: 'dateFrom' | 'dateTo',
    value: Date,
  ) => void;
  onUserFoodEntryFilterReset: () => void;
}

const createFoodEntriesActions: StateCreator<
  Store,
  StoreMiddleware,
  [],
  FoodEntriesSliceActions
> = (set) => ({
  onUserFoodEntryFilterChange: (filter, value) => {
    set((state) => {
      if (filter === 'dateFrom' && state.foodEntries.filters.dateTo <= value) {
        showMessage({
          message: 'To value must be greater than from value',
          type: 'danger',
        });
        return;
      }
      if (filter === 'dateTo' && state.foodEntries.filters.dateFrom >= value) {
        showMessage({
          message: 'To value must be greater than from value',
          type: 'danger',
        });
        return;
      }
      state.foodEntries.filters[filter] = value;
    });
  },
  onUserFoodEntryFilterReset: () => {
    set((state) => {
      state.foodEntries.filters.dateTo = new Date();
      state.foodEntries.filters.dateFrom = null;
    });
  },
});

export { createFoodEntriesActions };
export type { FoodEntriesSliceActions };
