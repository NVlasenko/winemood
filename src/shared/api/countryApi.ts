import { httpClient } from "./httpClient";

import type { CountryWineDto } from "../../types/countryWine";

export const getCountries = () => {
  return httpClient<CountryWineDto[]>("/api/countries");
};
