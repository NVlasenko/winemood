import type { UserResponse } from "@/types/user";
import { httpClient } from "./httpClient";
import type { FavoritesResponse } from "@/types/favorite";
import type { WineCatalogCard } from "@/types/wineCatalogCard";
import type { QuizHistoryResponse } from "@/types/quiz";

export const userApi = {
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    return httpClient<UserResponse>("/api/users/avatar", {
      method: "PUT",
      body: formData,
    });
  },

  deleteAvatar: () => {
    return httpClient<UserResponse>("/api/users/avatar", {
      method: "DELETE",
    });
  },

  getMe: () => {
    return httpClient<UserResponse>("/api/users/me", {
      method: "GET",
    });
  },

  getFavorites: async (): Promise<WineCatalogCard[]> => {
    const response = await httpClient<FavoritesResponse>(
      "/api/users/favorites",
      {
        method: "GET",
      }
    );
  
    return response.wines;
  },
  
  addFavorite: (wineId: number) => {
    return httpClient<void>(`/api/users/favorites/${wineId}`, {
      method: "POST",
    });
  },
  
  removeFavorite: (wineId: number) => {
    return httpClient<void>(`/api/users/favorites/${wineId}`, {
      method: "DELETE",
    });
  },

  getQuizHistory: async (): Promise<WineCatalogCard[]> => {
    const response = await httpClient<QuizHistoryResponse[]>(
      "/api/users/quiz-history",
      {
        method: "GET",
      }
    );
  
    const latest = response[0];
  
    return latest?.wines ?? [];
  },

  saveQuizResult: (wineIds: number[]) => {
    return httpClient<void>("/api/users/quiz-history", {
      method: "POST",
      body: JSON.stringify({ wineIds }),
    });
  },
};