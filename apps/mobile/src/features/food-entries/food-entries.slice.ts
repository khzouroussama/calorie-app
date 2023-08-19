import { StateCreator } from 'zustand';

import type { Store, StoreMiddleware } from '@/shared/store';

interface FoodEntriesSlice {
  foodEntries: {
    filters: {
      dateFrom: Date | null;
      dateTo: Date | null;
    };
  };
}

const createFoodEntriesSlice: StateCreator<
  Store,
  StoreMiddleware,
  [],
  FoodEntriesSlice
> = () => ({
  foodEntries: {
    filters: {
      dateFrom: null,
      dateTo: null,
    },
  },
});

export { createFoodEntriesSlice };
export type { FoodEntriesSlice };
