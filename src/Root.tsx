import { HashRouter, Route, Routes } from "react-router-dom";

import { App } from "@/App";
import { AboutPage } from "@/pages/AboutPage";
import { CatalogPage } from "@/pages/CatalogPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { HomePage } from "@/pages/HomePage";
import { WineDetailsPage } from "@/pages/WineDetailsPage";
import { WriteReviewPage } from "@/pages/WriteReviewPage";

import { FavoritesProvider } from "@/context/FavoritesContext";
import { ScrollToTop } from "./components/layout/ScrollToTop/ScrollToTop";
import { QuizPage } from "./pages/QuizPage";

const ROUTES = {
  home: "/",
  catalog: "/catalog",
  wineDetails: "/catalog/:id",
  writeReview: "/catalog/:id/review",
  about: "/about",
  history: "/history",
  quiz: "/quiz",
} as const;

export const Root = () => {
  return (
    <FavoritesProvider>
      <HashRouter>
        <ScrollToTop />

        <Routes>
          <Route path={ROUTES.home} element={<App />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.catalog} element={<CatalogPage />} />
            <Route path={ROUTES.wineDetails} element={<WineDetailsPage />} />
            <Route path={ROUTES.writeReview} element={<WriteReviewPage />} />
            <Route path={ROUTES.about} element={<AboutPage />} />
            <Route path={ROUTES.history} element={<HistoryPage />} />
            <Route path={ROUTES.quiz} element={<QuizPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </FavoritesProvider>
  );
};