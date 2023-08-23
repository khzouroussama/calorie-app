export interface DailyCaloriesReport {
  date: string;
  totalOfCalories?: number;
}

export interface UserCalorieCountModel {
  userId: string;
  // a date only string in the format of YYYY-MM-DD
  date: string;
  totalOfCalories?: number;
}
