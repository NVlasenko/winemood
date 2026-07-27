import type { UserReview, WineReview } from "@/types/reviews";
import { httpClient } from "./httpClient";

export const reviewApi = {
  getWineReviews: (wineId: number) => {
    return httpClient<WineReview[]>(
      `/api/wines/${wineId}/reviews`,
      {
        method: "GET",
      }
    );
  },

  createReview: (
    wineId: number,
    payload: { rating: number; reviewText: string }
  ) => {
    return httpClient<void>(
      `/api/wines/${wineId}/reviews`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  },

  updateReview: (
    reviewId: number,
    payload: { rating: number; reviewText: string }
  ) => {
    return httpClient<void>(
      `/api/users/reviews/${reviewId}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
  },

  deleteReview: (reviewId: number) => {
    return httpClient<void>(
      `/api/users/reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );
  },

  getMyReviews: () => {
    return httpClient<UserReview[]>(
      "/api/users/reviews",
      {
        method: "GET",
      }
    );
  },
};