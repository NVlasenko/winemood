type PageMeta = {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
};

export type PageDto<T> = {
  data: T[];
  meta: PageMeta;
};