import { HashRouter, Route, Routes } from "react-router-dom";

import { App } from "@/App";
import { AboutPage } from "@/pages/AboutPage";
import { CatalogPage } from "@/pages/CatalogPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { HomePage } from "@/pages/HomePage";
import { QuizPage } from "@/pages/QuizPage";
import { WineDetailsPage } from "@/pages/WineDetailsPage";
import { WriteReviewPage } from "@/pages/WriteReviewPage";
import { ScrollToTop } from "@/components/layout/ScrollToTop/ScrollToTop";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { QuizSessionProvider } from "./context/QuizSessionContext";
import { AuthPage } from "./pages/AuthPage";
import { AuthProvider } from "./context/AuthContext";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthRequiredProvider } from "@/context/AuthRequiredContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ROUTES = {
  home: "/",
  catalog: "/catalog",
  wineDetails: "/catalog/:id",
  writeReview: "/catalog/:id/review",
  about: "/about",
  history: "/history",
  quiz: "/quiz",
  auth: "/auth",
  profile: "/profile",
} as const;



export const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <AuthProvider>
          <AuthRequiredProvider>
            <FavoritesProvider>
              <QuizSessionProvider>

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
                    <Route path={ROUTES.auth} element={<AuthPage />} />
                    <Route path={ROUTES.profile} element={<ProfilePage />} />
                  </Route>
                </Routes>

              </QuizSessionProvider>
            </FavoritesProvider>
          </AuthRequiredProvider>
        </AuthProvider>
      </HashRouter>
    </QueryClientProvider>
  );
};