import { httpClient } from "@/shared/api/httpClient";

import type { MetadataFilter } from "@/types/metadata";

export const getMetadata = () => {
  return httpClient<MetadataFilter[]>("/api/metadata");
};