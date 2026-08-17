import type { FoodPairing } from "./food";
import type { NamedEntity } from "./namedEntity";

export type Wine = {
  id: number;
  name: string;
  type: string;
  volumeMl: number;
  description: string;
  imageUrl: string;
  rating: number;
  alcoholPercentage: number;

  sweetnessLevel: NamedEntity;
  grapeVariety: NamedEntity;
  acidity: NamedEntity;
  wineStyle: NamedEntity;

  agingMonths: number;
  environmentalAttributes: string[];
  fermentationType: string;
  vintage: number;
  appellation: string;
  producerName: string;
  countryName: string;
  region: string;

  foodPairings: FoodPairing[];
};