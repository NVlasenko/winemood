import { Outlet, useLocation, matchPath } from "react-router-dom";

import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

import { ROUTES } from "@/Root";

import "./App.scss";

export const App = () => {
  const location = useLocation();

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

      <main className="content">
        <Outlet />
      </main>

      {!shouldHideFooter && <Footer />}
    </div>
  );
};