import {
  createCookie,
  redirect,
  useLoaderData,
} from "react-router";

import { ProfilePage } from "@/pages/ProfilePage";

import { getCategories } from "@/shared/api/categoryApi";
import { userApi } from "@/shared/api/userApi";
import { quizApi } from "@/shared/api/quizApi";
import { reviewApi } from "@/shared/api/reviewApi";
import { achievementApi } from "@/shared/api/achievementApi";
import { ApiError } from "@/shared/api/httpClient";

const accessTokenCookie =
  createCookie("accessToken", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: import.meta.env.PROD,
  });

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

  let user;

  try {
    user = await userApi.getMe({
      authToken,
    });
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

    console.error(
      "Profile SSR user load failed:",
      error,
    );

    throw error;
  }

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

  const sortedFavoriteWines = [
    ...favoriteWines,
  ].sort(
    (a, b) => a.id - b.id,
  );

  return {
    categories,
    user,
    favoriteWines:
      sortedFavoriteWines,
    quizHistory,
    reviews,
    achievements,
  };
}

export default function Profile() {
  const {
    categories,
    user,
    favoriteWines,
    quizHistory,
    reviews,
    achievements,
  } = useLoaderData<
    typeof loader
  >();

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