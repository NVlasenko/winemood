import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import arrowRightIcon from "@/assets/images/icons/arrow-right.svg";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfileCategories } from "@/components/profile/ProfileCategories";

import "./ProfilePage.scss";
import { ProfileFavorites } from "@/components/profile/ProfileFavorites";
import { ProfileQuizResults } from "@/components/profile/ProfileQuizResults/ProfileQuizResults";
import { UserReviewsList } from "@/components/profile/UserReviewsList";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <main className="profile-page">
      <div className="container">
        <div className="profile-page__top">
          <Link to="/" className="profile-page__back">
            <img src={arrowRightIcon} alt="" />
            <span>Home</span>
          </Link>
        </div>

        <div className="profile-page__bottom">
          <div className="profile-page__status">
            <span className="profile-page__status--indicator" />
            <span>Authenticated</span>
          </div>

          <button
            className="profile-page__logout profile-page__logout--status"
            onClick={handleLogout}
          >
            <span className="profile-page__status-indicator" />
            <span>Log out</span>
          </button>
        </div>

        <ProfileHero
          achievementsCount={0}
        />

        <ProfileCategories />

        <ProfileFavorites />

        <ProfileQuizResults />

        <UserReviewsList />
      </div>
    </main>
  );
};