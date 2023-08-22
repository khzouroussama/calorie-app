import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createFoodEntriesSlice } from '@/features/food-entries/food-entries.slice';
import { createFoodEntriesActions } from '@/features/food-entries/food-entries.actions';

import { createReportingSlice } from '@/features/reporting/reporting.slice';
import { createReportingActions } from '@/features/reporting/reporting.actions';

import type {
  FoodEntriesSlice,
  FoodEntriesSliceActions,
} from '@/features/food-entries';

import type {
  ReportingSlice,
  ReportingSliceActions,
} from '@/features/reporting';

export type StoreState = FoodEntriesSlice & ReportingSlice; // & OtherSlice & AnotherSlice;
export type StoreActions = FoodEntriesSliceActions & ReportingSliceActions; // & OtherSliceActions & AnotherSliceActions

export type Store = StoreState & {
  actions: StoreActions & { reset: () => void };
};

export type StoreMiddleware = [['zustand/immer', never]];

export const store = create<Store, StoreMiddleware>(
  immer((...a) => ({
    ...createFoodEntriesSlice(...a),
    ...createReportingSlice(...a),
    actions: {
      ...createFoodEntriesActions(...a),
      ...createReportingActions(...a),
      // reset store action
      reset: () => {
        a[0]((state) => {
          state.foodEntries = createFoodEntriesSlice(...a).foodEntries;
          state.reporting = createReportingSlice(...a).reporting;
        });
      },
    },
  })),
);

export const useStore = store;

// DEBUGGING
store.subscribe((state) => {
  console.log('store state', state);
});
