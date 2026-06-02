import type { CountryWine } from "../../types/countryWine";
import { httpClient } from "./httpClient";

export const getCountries = () => {
  return httpClient<CountryWine[]>("/api/countries");
};
