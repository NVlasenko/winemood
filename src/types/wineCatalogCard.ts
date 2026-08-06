export type WineCatalogCard = {
  id: number;
  name: string;
  type: string;
  sweetnessLevel: {
    id?: number;
    name: string;
  };
  volumeMl: number;
  countryName: string;
  imageUrl: string;
  rating: number;
};