export interface FoodEntry {
  /**  ISO string of the date of when the food entry was created */
  id?: string;
  name: string;
  calories: number;
  photoUrl?: string;
  consumptionDate?: string;
  createdAt?: string;
  userId?: string;
}
