import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

import "./ProfilePage.scss";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const {
    accessToken,
    tokenType,
    isAuthenticated,
    logout,
  } = useAuth();

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
        <section className="profile-page__card">
          <p className="profile-page__eyebrow">Personal account</p>

          <h1 className="profile-page__title">Your profile</h1>

          <p className="profile-page__text">
            You have successfully signed in to Vinoteca.
          </p>

          <div className="profile-page__status">
            <span className="profile-page__status-indicator" />

            <span>Authenticated</span>
          </div>

          <div className="profile-page__data">
            <div className="profile-page__data-row">
              <span className="profile-page__data-label">Token type</span>

              <span className="profile-page__data-value">
                {tokenType ?? "Bearer"}
              </span>
            </div>

            <div className="profile-page__data-row">
              <span className="profile-page__data-label">Access token</span>

              <span className="profile-page__data-value profile-page__data-value--token">
                {accessToken
                  ? `${accessToken.slice(0, 24)}...`
                  : "Token is missing"}
              </span>
            </div>
          </div>

          <p className="profile-page__notice">
            This is a temporary profile page for testing authorization. User
            information and saved wines will be added after the profile API is
            connected.
          </p>

          <button
            className="profile-page__logout"
            type="button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </section>
      </div>
    </main>
  );
};