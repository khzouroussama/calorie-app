import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createFoodEntriesSlice } from '@/features/food-entries/food-entries.slice';
import { createFoodEntriesActions } from '@/features/food-entries/food-entries.actions';

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
