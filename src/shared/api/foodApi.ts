import { httpClient } from "./httpClient";

export type FoodPairing = {
  id: number;
  foodImageUrl: string;
  foodCategory: string;
  foodType: string;
};

export const getFoods = () => {
  return httpClient<FoodPairing[]>("/api/foods");
};