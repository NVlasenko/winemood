export type WineFilterRequest = {
  search?: string;
  wineTypes?: string[];
  sweetnessLevels?: string[];
  countries?: string[];
  grapeVarieties?: string[];
  wineStyles?: string[];
  acidityLevels?: string[];
  aromaNotes?: string[];
  moods?: string[];
  events?: string[];
  seasons?: string[];
  foodName?: string[];
};

export type FilterWinesParams = {
  filters: WineFilterRequest;
  page: number;
  size: number;
  sort?: string[];
  signal?: AbortSignal;
};

export type WineArrayFilterKey = Exclude<
  keyof WineFilterRequest,
  "search"
>;

export type FilterOption = {
  id: string;
  label: string;
  value: string;
};

export type FilterSubgroup = {
  id: string;
  title: string;
  filterId: WineArrayFilterKey;
  options: FilterOption[];
};

export type FilterGroup = {
  id: string;
  title: string;
  iconUrl: string;
  options?: FilterOption[];
  subgroups?: FilterSubgroup[];
};

