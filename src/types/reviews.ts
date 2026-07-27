export type WineReview = {
  id: number;
  userId: number;
  userName: string;
  avatarUrl: string;
  rating: number;
  reviewText: string;
  createdAt: string;
};

export type UserReview = {
  reviewId: number;
  wineId: number;
  wineName: string;
  wineImageUrl: string;
  rating: number;
  reviewText: string;
  createdAt: string;
};