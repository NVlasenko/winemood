import type { UserDto } from "@/types/user";
import { httpClient } from "./httpClient";
import type { FavoritesResponseDto } from "@/types/favorite";
import type { WineCatalogCard } from "@/types/wineCatalogCard";
import type { QuizHistoryResponse } from "@/types/quiz";

type AuthOptions = {
  authToken?: string | null;
};

export const userApi = {
  uploadAvatar: (file: File) => {
    const formData = new FormData();

    formData.append(
      "image",
      file,
    );

    return httpClient<UserDto>(
      "/api/users/avatar",
      {
        method: "PUT",
        body: formData,
      },
    );
  },

  deleteAvatar: () => {
    return httpClient<UserDto>(
      "/api/users/avatar",
      {
        method: "DELETE",
      },
    );
  },

  getMe: (
    options: AuthOptions = {},
  ) => {
    return httpClient<UserDto>(
      "/api/users/me",
      {
        authToken:
          options.authToken,
      },
    );
  },

  getFavorites: async (
    options: AuthOptions = {},
  ): Promise<
    WineCatalogCard[]
  > => {
    const response =
      await httpClient<FavoritesResponseDto>(
        "/api/users/favorites",
        {
          authToken:
            options.authToken,
        },
      );

    return response?.wines ?? [];
  },

  addFavorite: (
    wineId: number,
  ) => {
    return httpClient<void>(
      `/api/users/favorites/${wineId}`,
      {
        method: "POST",
      },
    );
  },

  removeFavorite: (
    wineId: number,
  ) => {
    return httpClient<void>(
      `/api/users/favorites/${wineId}`,
      {
        method: "DELETE",
      },
    );
  },

  getQuizHistory: async (
    options: AuthOptions = {},
  ): Promise<
    WineCatalogCard[]
  > => {
    const response =
      await httpClient<
        QuizHistoryResponse[]
      >(
        "/api/users/quiz-history",
        {
          authToken:
            options.authToken,
        },
      );

    if (
      !Array.isArray(response) ||
      response.length === 0
    ) {
      return [];
    }

    const latest =
      response[
        response.length - 1
      ];

    return latest?.wines ?? [];
  },

  saveQuizResult: (
    wineIds: number[],
  ) => {
    return httpClient<void>(
      "/api/users/quiz-history",
      {
        method: "POST",
        body: JSON.stringify({
          wineIds,
        }),
      },
    );
  },
};