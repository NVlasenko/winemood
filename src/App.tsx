import {
  Outlet,
  matchPath,
  useLocation,
} from "react-router";

import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

import { NavigationLoadingOverlay } from "@/components/ui/NavigationLoadingOverlay";
import { AchievementUnlockedModal } from "./components/profile/AchievementUnlockedModal";

import { ROUTES } from "@/constants/routes";

import { useAppLoading } from "@/context/AppLoadingContext";

import { useAchievementListener } from "./hooks/achievements/useAchievementListener";

import "./App.scss";

export const App = () => {
  const location = useLocation();

  const {
    isBackendLoading,
  } = useAppLoading();

  const {
    unlocked,
    closeAchievement,
  } = useAchievementListener();

  const isReviewPage = matchPath(
    {
      path: "/catalog/:id/review",
    },
    location.pathname,
  );

  const isQuizPage =
    location.pathname.startsWith(
      ROUTES.quiz,
    );

  const isAuthPage =
    location.pathname.startsWith(
      ROUTES.auth,
    );

  const shouldHideFooter =
    isReviewPage ||
    isQuizPage ||
    isAuthPage ||
    isBackendLoading;

  return (
    <div className="App">
      <Header />

      <NavigationLoadingOverlay />

      {unlocked && (
        <AchievementUnlockedModal
          achievement={unlocked}
          onClose={
            closeAchievement
          }
        />
      )}

      <main className="content">
        <Outlet />
      </main>

      {!shouldHideFooter && (
        <Footer />
      )}
    </div>
  );
};