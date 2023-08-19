import { StateCreator } from 'zustand';

import type { Store, StoreMiddleware } from '@/shared/store';

interface FoodEntriesSliceActions {
  onUserFoodEntryFilterChange: (
    filter: 'dateFrom' | 'dateTo',
    value: Date,
  ) => void;
}

const createFoodEntriesActions: StateCreator<
  Store,
  StoreMiddleware,
  [],
  FoodEntriesSliceActions
> = (set) => ({
  onUserFoodEntryFilterChange: (filter, value) => {
    set((state) => {
      state.foodEntries.filters[filter] = value;
    });
  },
});

export { createFoodEntriesActions };
export type { FoodEntriesSliceActions };
