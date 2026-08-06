export type MetadataOption = {
  name: string;
};

export type MetadataFoodGroup = {
  category: string;
  foods: MetadataOption[];
};

export type MetadataMoodOptions = {
  moods: MetadataOption[];
  events: MetadataOption[];
  seasons: MetadataOption[];
};

export type MetadataOptions =
  | MetadataOption[]
  | MetadataFoodGroup[]
  | MetadataMoodOptions;

export type MetadataFilter = {
  filterKey: string;
  title: string;
  iconUrl: string;
  options: MetadataOptions;
};
