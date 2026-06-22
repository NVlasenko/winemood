import type { FoodPairing } from "./food";

export type Wine = {
  id: number;
  name: string;
  type: string;
  volumeMl: number;
  description: string;
  imageUrl: string;
  rating: number;
  alcoholPercentage: number;

  sweetnessLevel: {
    id: number;
    name: string;
  };

  grapeVariety: {
    id: number;
    name: string;
  };

  acidity: {
    id: number;
    name: string;
  };

  wineStyle: {
    id: number;
    name: string;
  };

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