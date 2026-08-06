import type { NamedEntity } from "./namedEntity";

export type FoodPairing = {
  id: number;
  imageUrl: string;
  foodCategory: NamedEntity;
  name: string;
};