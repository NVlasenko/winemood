import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { reviewApi } from "@/shared/api/reviewApi";

export const useCreateReview = (wineId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { rating: number; reviewText: string }) =>
      reviewApi.createReview(wineId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wine-reviews", wineId],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-reviews"],
      });
    },
  });
};


export const useUserReviews = () => {
  return useQuery({
    queryKey: ["my-reviews"],
    queryFn: reviewApi.getMyReviews,
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      rating,
      reviewText,
    }: {
      reviewId: number;
      rating: number;
      reviewText: string;
    }) =>
      reviewApi.updateReview(reviewId, { rating, reviewText }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-reviews"],
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) =>
      reviewApi.deleteReview(reviewId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-reviews"],
      });
    },
  });
};