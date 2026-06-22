export type FoodPairing = {
  id: number;
  foodImageUrl: string;
  foodCategory: {
    id: number;
    name: string;
  };
  name: string;
};