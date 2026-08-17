import { Outlet, useLocation, matchPath } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ROUTES } from "@/Root";
import "./App.scss";
import { useAchievementListener } from "./hooks/achievements/useAchievementListener";
import { AchievementUnlockedModal } from "./components/profile/AchievementUnlockedModal";

export const App = () => {
  const location = useLocation();
  const { unlocked, closeAchievement } = useAchievementListener();

  const isReviewPage = matchPath(
    { path: "/catalog/:id/review" },
    location.pathname
  );

  const isQuizPage = location.pathname.startsWith(ROUTES.quiz);
  const isAuthPage = location.pathname.startsWith(ROUTES.auth);

  const shouldHideFooter = isReviewPage || isQuizPage || isAuthPage;

  return (
    <div className="App">
      <Header />

      {unlocked && (
        <AchievementUnlockedModal
          achievement={unlocked}
          onClose={closeAchievement}
        />
      )}

      <main className="content">
        <Outlet />
      </main>

      {!shouldHideFooter && <Footer />}
    </div>
  );
};
