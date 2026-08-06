import type { CountryWineDto } from "../../types/countryWine";
import { httpClient } from "./httpClient";

export const getCountries = () => {
  return httpClient<CountryWineDto[]>("/api/countries");
};
