import { API_BASE_URL } from "./config";

export type WineFilterRequest = {
  wineTypes?: string[];
  sweetnessLevels?: string[];
  countries?: string[];
  grapeVarieties?: string[];
  wineStyles?: string[];
  acidityLevels?: string[];
  aromaNotes?: string[];
  moods?: string[];
  foodTypes?: string[];
};

export const filterWines = async (filters: WineFilterRequest) => {
  const response = await fetch(`${API_BASE_URL}/api/wines/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });

  if (!response.ok) {
    throw new Error(`Failed to filter wines: ${response.status}`);
  }

  return response.json();
};