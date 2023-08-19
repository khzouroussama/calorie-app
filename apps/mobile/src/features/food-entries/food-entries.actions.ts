import { StateCreator } from 'zustand';

import type { Store, StoreMiddleware } from '@/shared/store';

interface FoodEntriesSliceActions {
  onUserFoodEntryFilterChange: (filter: string, value: string) => void;
}

const createFoodEntriesActions: StateCreator<
  Store,
  StoreMiddleware,
  [],
  FoodEntriesSliceActions
> = (set) => ({
  onUserFoodEntryFilterChange: (filter, value) => {},
});

export { createFoodEntriesActions };
export type { FoodEntriesSliceActions };
