import type { Achievement } from "@/types/achievement";
import { httpClient } from "./httpClient";


export const achievementApi = {
  getAchievements: () => {
    return httpClient<Achievement[]>("/api/users/me/achievements");
  },
};