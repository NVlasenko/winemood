export type Wine = {
  id: number;
  name: string;
  type: WineType;
  volumeMl: number;
  description: string;
  imageUrl: string;
  rating: number;
  alcoholPercentage: number;
  sweetnessLevel: SweetnessLevel;
  grapeVariety: GrapeVariety;
  agingMonths: number;
  environmentalAttributes: EnvironmentalAttribute[];
  fermentationType: string;
  vintage: number;
  appellation: string;
  producerName: string;
  countryName: string;
  region: string;
};

export type WineType =
  | "RED"
  | "WHITE"
  | "ROSE"
  | "SPARKLING";

export type SweetnessLevel =
  | "DRY"
  | "SEMI_DRY"
  | "SEMI_SWEET"
  | "SWEET";

export type GrapeVariety =
  | "CABERNET_SAUVIGNON"
  | "MERLOT"
  | "PINOT_NOIR"
  | "CHARDONNAY"
  | "SAUVIGNON_BLANC"
  | "RIESLING";

export type EnvironmentalAttribute =
  | "ORGANIC"
  | "BIODYNAMIC"
  | "VEGAN";