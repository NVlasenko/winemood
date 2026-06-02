export type FilterOption = {
  id: number;
  label: string;
  value: string;
  image?: string;
};

export type FilterGroup = {
  id: string;
  title: string;
  options: FilterOption[];
};