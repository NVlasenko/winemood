export type PageMeta = {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};

export type PageResponse<T> = {
  data: T[];
  meta: PageMeta;
};