export interface FoodEntry {
  /**  ISO string of the date of when the food entry was created */
  id?: string;
  name: string;
  calories: number;
  consumptionDate?: string;
  createdAt?: string;
  userId?: string;
  photo?: {
    uri?: string;
    base64?: string;
  };
}
