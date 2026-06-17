import type { Category } from "@/types/categories";
import type { CountryWine } from "@/types/countryWine";
import type { FilterGroup } from "@/types/filters";
import type { FoodPairing } from "@/types/food";

type Params = {
  categories: Category[];
  countries: CountryWine[];
  foods: FoodPairing[];
};

export const buildFilterGroups = ({
  categories,
  countries,
  foods,
}: Params): FilterGroup[] => [
  {
    id: "wineTypes",
    title: "Wine Type",
    options: categories.map((category) => ({
      id: category.id,
      label: category.title,
      value: category.type,
    })),
  },
  {
    id: "countries",
    title: "Countries",
    options: countries.map((country) => ({
      id: country.id,
      label: country.name,
      value: country.name,
    })),
  },
  {
    id: "foodTypes",
    title: "Food Pairing",
    options: foods.map((food) => ({
      id: food.id,
      label: food.name,
      value: food.name,
    })),
  },
];