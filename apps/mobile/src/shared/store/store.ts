import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  createFoodEntriesSlice,
  createFoodEntriesActions,
} from '@/features/food-entries';

import type {
  FoodEntriesSlice,
  FoodEntriesSliceActions,
} from '@/features/food-entries';

export type StoreState = FoodEntriesSlice; // & OtherSlice & AnotherSlice;
export type StoreActions = FoodEntriesSliceActions; // & OtherSliceActions & AnotherSliceActions

export type Store = StoreState & {
  actions: StoreActions;
};

export type StoreMiddleware = [['zustand/immer', never]];

export const store = create<Store, StoreMiddleware>(
  immer((...a) => ({
    ...createFoodEntriesSlice(...a),
    foodEntries: { filters: { dateTo: null, dateFrom: null } },
    actions: {
      ...createFoodEntriesActions(...a),
    },
  })),
);

export const useStore = store;

// DEBUGGING
store.subscribe((state) => {
  console.log('store state', state);
});
