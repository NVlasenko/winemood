import type { NamedEntity } from "./namedEntity";

export type FoodPairing = {
  id: number;
  foodImageUrl: string;
  foodCategory: NamedEntity;
  name: string;
};