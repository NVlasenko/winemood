import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { reviewApi } from "@/shared/api/reviewApi";

import { invalidateUserData } from "@/shared/lib/invalidateUserData";
import { refetchAchievementsSafe } from "@/shared/lib/refetchAchievementsSafe";

import { useAuth } from "@/context/AuthContext";

export const useCreateReview = (
  wineId: number,
) => {
  const queryClient =
    useQueryClient();

  const {
    user,
    refreshUser,
  } = useAuth();

  return useMutation({
    mutationFn: (data: {
      rating: number;
      reviewText: string;
    }) =>
      reviewApi.createReview(
        wineId,
        data,
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "wine-reviews",
          wineId,
        ],
      });

      await queryClient.invalidateQueries({
        queryKey: [
          "my-reviews",
          user?.id,
        ],
      });

      invalidateUserData(
        user?.id,
      );

      await refetchAchievementsSafe(
        queryClient,
        user?.id,
      );

      await refreshUser();
    },
  });
};

export const useUserReviews = (
  initialData?: Awaited<
    ReturnType<
      typeof reviewApi.getMyReviews
    >
  >,
) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: [
      "my-reviews",
      user?.id,
    ],

    queryFn: () =>
      reviewApi.getMyReviews(),

    enabled: Boolean(user),

    initialData,

    staleTime: 0,

    refetchOnMount: true,
  });
};

export const useUpdateReview = (
  wineId: number,
) => {
  const queryClient =
    useQueryClient();

  const {
    user,
    refreshUser,
  } = useAuth();

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
      reviewApi.updateReview(
        reviewId,
        {
          rating,
          reviewText,
        },
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "wine-reviews",
          wineId,
        ],
      });

      await queryClient.invalidateQueries({
        queryKey: [
          "my-reviews",
          user?.id,
        ],
      });

      invalidateUserData(
        user?.id,
      );

      await refetchAchievementsSafe(
        queryClient,
        user?.id,
      );

      await refreshUser();
    },
  });
};

export const useDeleteReview = () => {
  const queryClient =
    useQueryClient();

  const {
    user,
    refreshUser,
  } = useAuth();

  return useMutation({
    mutationFn: (
      reviewId: number,
    ) =>
      reviewApi.deleteReview(
        reviewId,
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "my-reviews",
          user?.id,
        ],
      });

      await queryClient.invalidateQueries({
        queryKey: [
          "wine-reviews",
        ],
      });

      invalidateUserData(
        user?.id,
      );

      await refetchAchievementsSafe(
        queryClient,
        user?.id,
      );

      await refreshUser();
    },
  });
};