import {
  useNavigate,
  Link,
  useFetcher,
} from "react-router";

import { useAuth } from "@/context/AuthContext";
import { ProfileQuizResults } from "@/components/profile/ProfileQuizResults";

import type { Category } from "@/types/categories";
import type { UserDto } from "@/types/user";
import type { WineCatalogCard } from "@/types/wineCatalogCard";
import type { QuizHistoryItem } from "@/types/quizProfile";
import type { UserReviewDto } from "@/types/reviews";
import type { Achievement } from "@/types/achievement";

import arrowRightIcon from "@/assets/images/icons/arrow-right.svg";

import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfileCategories } from "@/components/profile/ProfileCategories";
import { ProfileFavorites } from "@/components/profile/ProfileFavorites";

import { UserReviewsList } from "@/components/profile/UserReviewsList";
import { ProfileAchievements } from "@/components/profile/ProfileAchievements";

import "./ProfilePage.scss";

type ProfilePageProps = {
  categories: Category[];
  user: UserDto;
  initialFavoriteWines: WineCatalogCard[];
  initialQuizHistory: QuizHistoryItem[];
  initialReviews: UserReviewDto[];
  initialAchievements: Achievement[];
};

export const ProfilePage = ({
  categories,
  user,
  initialFavoriteWines,
  initialQuizHistory,
  initialReviews,
  initialAchievements,
}: ProfilePageProps) => {
  const navigate = useNavigate();

  const logoutFetcher = useFetcher();

  const {
    logout,
  } = useAuth();

  const handleLogout = async () => {
    const formData = new FormData();

    formData.set(
      "intent",
      "logout",
    );

    await logoutFetcher.submit(
      formData,
      {
        method: "post",
        action: "/auth",
      },
    );

    logout();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <main className="profile-page">
      <div className="container">
        <div className="profile-page__top">
          <Link
            to="/"
            className="profile-page__back"
          >
            <img
              src={arrowRightIcon}
              alt=""
            />

            <span>
              Home
            </span>
          </Link>
        </div>

        <div className="profile-page__bottom">
          <div className="profile-page__status">
            <span className="profile-page__status--indicator" />

            <span>
              Authenticated
            </span>
          </div>

          <button
            className="profile-page__logout profile-page__logout--status"
            type="button"
            onClick={handleLogout}
            disabled={
              logoutFetcher.state !== "idle"
            }
          >
            <span className="profile-page__status-indicator" />

            <span>
              {logoutFetcher.state !== "idle"
                ? "Logging out..."
                : "Log out"}
            </span>
          </button>
        </div>

        <ProfileHero
          initialUser={user}
          initialFavoritesCount={
            initialFavoriteWines.length
          }
        />

        <ProfileCategories
          categories={categories}
        />

        <ProfileFavorites
          initialFavoriteWines={
            initialFavoriteWines
          }
        />

        <ProfileQuizResults
          initialQuizHistory={
            initialQuizHistory
          }
        />

        <UserReviewsList
          initialReviews={
            initialReviews
          }
        />

        <ProfileAchievements
          initialUser={user}
          initialAchievements={
            initialAchievements
          }
        />
      </div>
    </main>
  );
};