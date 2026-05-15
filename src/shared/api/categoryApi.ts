import type { Category } from '../../types/categories';

import { httpClient } from './httpClient';

export const getCategories = () => {
  return httpClient<Category[]>('/api/categories');
};