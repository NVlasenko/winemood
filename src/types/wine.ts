export type SweetnessLevel =
  | "DRY"
  | "SEMI_DRY"
  | "SEMI_SWEET"
  | "SWEET"
  | "BRUT";

export type EnvironmentalAttribute =
  | "ORGANIC"
  | "VEGAN"
  | "SUSTAINABLE"
  | "BIODYNAMIC";

export type Category = {
  id: number;
  title: string;
  type: string;
  image?: string;
};

export type Region = {
  id: number;
  name: string;
};

export type Country = {
  id: number;
  name: string;
};

export type Producer = {
  id: number;
  name: string;
};

export type Food = {
  id: number;
  name: string;
  image?: string;
};

export type Wine = {
  id: number;
  name: string;
  bottleVolume: number;
  grapeVariety: string;
  image: string;
  description: string;
  vintage: number;
  rating: number;
  agingYears: number;
  alcoholByVolume: number;
  appellation: string;
  fermentation: string;
  category: Category;
  region: Region;
  country: Country;
  sweetness: SweetnessLevel;
  ecoAttributes: EnvironmentalAttribute[];
  aromaticNotes: string;
  producer: Producer;
  foods: Food[];
};
