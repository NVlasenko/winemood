export type WineReviewDto = {
  id: number;
  userId: number;
  userName: string;
  avatarUrl: string | null;
  rating: number;
  reviewText: string;
  createdAt: string;
};

export type UserReviewDto = {
  reviewId: number;
  wineId: number;
  wineName: string;
  wineImageUrl: string;
  rating: number;
  reviewText: string;
  createdAt: string;
};