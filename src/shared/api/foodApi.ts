import type { FoodPairing } from "@/types/food";
import { httpClient } from "./httpClient";

export const getFoods = () => {
  return httpClient<FoodPairing[]>("/api/foods");
};