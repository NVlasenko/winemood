import {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import {
  createCookie,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router";

import { ProfilePage } from "@/pages/ProfilePage";

import { useAppLoading } from "@/context/AppLoadingContext";

import { getCategories } from "@/shared/api/categoryApi";
import { userApi } from "@/shared/api/userApi";
import { quizApi } from "@/shared/api/quizApi";
import { reviewApi } from "@/shared/api/reviewApi";
import { achievementApi } from "@/shared/api/achievementApi";

import {
  ApiError,
  SsrTimeoutError,
} from "@/shared/api/httpClient";

import type { Category } from "@/types/categories";
import type { UserDto } from "@/types/user";
import type { WineCatalogCard } from "@/types/wineCatalogCard";
import type { QuizHistoryItem } from "@/types/quizProfile";
import type { UserReviewDto } from "@/types/reviews";
import type { Achievement } from "@/types/achievement";

const RECOVERY_RETRY_DELAY_MS = 3_000;

const accessTokenCookie =
  createCookie("accessToken", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: import.meta.env.PROD,
  });

const sortFavoriteWines = (
  wines: WineCatalogCard[],
) => {
  return [...wines].sort(
    (a, b) => a.id - b.id,
  );
};

export async function loader({
  request,
}: {
  request: Request;
}) {
  const authToken =
    await accessTokenCookie.parse(
      request.headers.get("Cookie"),
    );

  if (!authToken) {
    throw redirect(
      "/auth?mode=login",
    );
  }

  try {
    const user =
      await userApi.getMe({
        authToken,
      });

    const [
      categories,
      favoriteWines,
      quizHistory,
      reviews,
      achievements,
    ] = await Promise.all([
      getCategories(),

      userApi.getFavorites({
        authToken,
      }),

      quizApi.getHistory({
        authToken,
      }),

      reviewApi.getMyReviews({
        authToken,
      }),

      achievementApi.getAchievements({
        authToken,
      }),
    ]);

    return {
      categories,
      user,
      favoriteWines:
        sortFavoriteWines(
          favoriteWines,
        ),
      quizHistory,
      reviews,
      achievements,
      needsClientRecovery: false,
    };
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 401 ||
        error.status === 403)
    ) {
      throw redirect(
        "/auth?mode=login",
      );
    }

    if (
      error instanceof
      SsrTimeoutError
    ) {
      console.warn(
        "[Profile loader] Backend did not respond in time. Switching to client recovery.",
      );

      return {
        categories:
          [] as Category[],

        user:
          null as UserDto | null,

        favoriteWines:
          [] as WineCatalogCard[],

        quizHistory:
          [] as QuizHistoryItem[],

        reviews:
          [] as UserReviewDto[],

        achievements:
          [] as Achievement[],

        needsClientRecovery: true,
      };
    }

    console.error(
      "Profile SSR load failed:",
      error,
    );

    throw error;
  }
}

export default function Profile() {
  const loaderData =
    useLoaderData<typeof loader>();

  const navigate =
    useNavigate();

  const {
    startBackendLoading,
    stopBackendLoading,
  } = useAppLoading();

  const [
    categories,
    setCategories,
  ] = useState(
    loaderData.categories,
  );

  const [
    user,
    setUser,
  ] = useState<UserDto | null>(
    loaderData.user,
  );

  const [
    favoriteWines,
    setFavoriteWines,
  ] = useState(
    loaderData.favoriteWines,
  );

  const [
    quizHistory,
    setQuizHistory,
  ] = useState(
    loaderData.quizHistory,
  );

  const [
    reviews,
    setReviews,
  ] = useState(
    loaderData.reviews,
  );

  const [
    achievements,
    setAchievements,
  ] = useState(
    loaderData.achievements,
  );

  const [
    isRecovering,
    setIsRecovering,
  ] = useState(
    loaderData.needsClientRecovery,
  );

  useLayoutEffect(() => {
    if (
      loaderData.needsClientRecovery
    ) {
      startBackendLoading();
    }
  }, [
    loaderData.needsClientRecovery,
    startBackendLoading,
  ]);

  useEffect(() => {
    if (
      !loaderData.needsClientRecovery
    ) {
      stopBackendLoading();

      return;
    }

    let isCancelled = false;

    let retryTimer:
      | ReturnType<
          typeof setTimeout
        >
      | undefined;

    const recover =
      async () => {
        try {
          const [
            recoveredUser,
            recoveredCategories,
            recoveredFavoriteWines,
            recoveredQuizHistory,
            recoveredReviews,
            recoveredAchievements,
          ] = await Promise.all([
            userApi.getMe(),

            getCategories(),

            userApi.getFavorites(),

            quizApi.getHistory(),

            reviewApi.getMyReviews(),

            achievementApi.getAchievements(),
          ]);

          if (isCancelled) {
            return;
          }

          setUser(
            recoveredUser,
          );

          setCategories(
            recoveredCategories,
          );

          setFavoriteWines(
            sortFavoriteWines(
              recoveredFavoriteWines,
            ),
          );

          setQuizHistory(
            recoveredQuizHistory,
          );

          setReviews(
            recoveredReviews,
          );

          setAchievements(
            recoveredAchievements,
          );

          setIsRecovering(false);

          stopBackendLoading();
        } catch (error) {
          if (isCancelled) {
            return;
          }

          if (
            error instanceof ApiError &&
            (error.status === 401 ||
              error.status === 403)
          ) {
            stopBackendLoading();

            navigate(
              "/auth?mode=login",
              {
                replace: true,
              },
            );

            return;
          }

          console.warn(
            "[Profile recovery] Backend is not ready yet:",
            error,
          );

          retryTimer =
            setTimeout(
              recover,
              RECOVERY_RETRY_DELAY_MS,
            );
        }
      };

    void recover();

    return () => {
      isCancelled = true;

      if (retryTimer) {
        clearTimeout(
          retryTimer,
        );
      }

      stopBackendLoading();
    };
  }, [
    loaderData.needsClientRecovery,
    navigate,
    stopBackendLoading,
  ]);

  if (
    isRecovering ||
    !user
  ) {
    return null;
  }

  return (
    <ProfilePage
      categories={categories}
      user={user}
      initialFavoriteWines={
        favoriteWines
      }
      initialQuizHistory={
        quizHistory
      }
      initialReviews={
        reviews
      }
      initialAchievements={
        achievements
      }
    />
  );
}