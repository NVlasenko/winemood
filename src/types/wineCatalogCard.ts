export type WineCatalogCard = {
  id: number;
  name: string;
  type: string;
  sweetnessLevel: {
    name: string;
  };
  volumeMl: number;
  countryName: string;
  imageUrl: string;
  rating: number;
};