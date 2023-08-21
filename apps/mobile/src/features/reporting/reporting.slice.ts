import { StateCreator } from 'zustand';

import type { Store, StoreMiddleware } from '@/shared/store';

interface ReportingSlice {
  reporting: {
    dailyCalories: {
      filters: {
        exceededCalorieLimit: boolean | undefined;
      };
    };
  };
}

const createReportingSlice: StateCreator<
  Store,
  StoreMiddleware,
  [],
  ReportingSlice
> = () => ({
  reporting: {
    dailyCalories: {
      filters: {
        exceededCalorieLimit: undefined,
      },
    },
  },
});

export { createReportingSlice };
export type { ReportingSlice };
