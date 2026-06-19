export type FilterOption = {
  id: string;
  label: string;
  value: string;
};

export type FilterSubgroup = {
  id: string;
  title: string;
  filterId: string;
  options: FilterOption[];
};

export type FilterGroup = {
  id: string;
  title: string;
  iconUrl: string;
  options?: FilterOption[];
  subgroups?: FilterSubgroup[];
};