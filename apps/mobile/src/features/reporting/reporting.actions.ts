import { StateCreator } from 'zustand';

import type { Store, StoreMiddleware } from '@/shared/store';

interface ReportingSliceActions {
  onUserDailyCaloriesFilterChange: (
    filter: 'exceededCalorieLimit', // 'other filter'
    value: boolean,
  ) => void;
}

const createReportingActions: StateCreator<
  Store,
  StoreMiddleware,
  [],
  ReportingSliceActions
> = (set) => ({
  onUserDailyCaloriesFilterChange: (filter, value) => {
    set((state) => {
      state.reporting.dailyCalories.filters[filter] = value;
    });
  },
});

export { createReportingActions };
export type { ReportingSliceActions };
