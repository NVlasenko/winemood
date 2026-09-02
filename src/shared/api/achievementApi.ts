import type { Achievement } from "@/types/achievement";

import { httpClient } from "./httpClient";

type AuthOptions = {
  authToken?: string | null;
};

export const achievementApi = {
  getAchievements: (
    {
      authToken,
    }: AuthOptions = {},
  ) => {
    return httpClient<
      Achievement[]
    >(
      "/api/users/me/achievements",
      {
        method: "GET",
        authToken,
      },
    );
  },
};