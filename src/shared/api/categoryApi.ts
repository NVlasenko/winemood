import { httpClient } from "./httpClient";

import type { Category } from "../../types/categories";

export const getCategories = () => {
  return httpClient<Category[]>("/api/categories");
};
