import { httpClient } from "@/shared/api/httpClient";

import type { MoodAsset } from "@/types/mood";

export const getMoodAssets = async (): Promise<MoodAsset[]> => {
  return httpClient<MoodAsset[]>("/api/assets/moods");
};