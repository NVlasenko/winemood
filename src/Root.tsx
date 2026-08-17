import { HashRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { queryClient } from "@/shared/lib/reactQuery";

import { App } from "@/App";
import { AboutPage } from "@/pages/AboutPage";
import { CatalogPage } from "@/pages/CatalogPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { HomePage } from "@/pages/HomePage";
import { QuizPage } from "@/pages/QuizPage";
import { WineDetailsPage } from "@/pages/WineDetailsPage";
import { WriteReviewPage } from "@/pages/WriteReviewPage";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";

import { ScrollToTop } from "@/components/layout/ScrollToTop/ScrollToTop";

import { FavoritesProvider } from "@/context/FavoritesContext";
import { QuizSessionProvider } from "./context/QuizSessionContext";
import { AuthProvider } from "./context/AuthContext";
import { AuthRequiredProvider } from "@/context/AuthRequiredContext";

export const ROUTES = {
  home: "/",
  catalog: "/catalog",

  wineDetails: (id: number) => `/catalog/${id}`,
  writeReview: (id: number) => `/catalog/${id}/review`,

  about: "/about",
  history: "/history",
  quiz: "/quiz",
  auth: "/auth",
  profile: "/profile",
} as const;

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <AuthRequiredProvider>
        <FavoritesProvider>
          <QuizSessionProvider>{children}</QuizSessionProvider>
        </FavoritesProvider>
      </AuthRequiredProvider>
    </AuthProvider>
  );
};

export const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <AppProviders>
          <ScrollToTop />

          <Routes>
            <Route path={ROUTES.home} element={<App />}>
              <Route index element={<HomePage />} />

              <Route path={ROUTES.catalog} element={<CatalogPage />} />
              <Route path="/catalog/:id" element={<WineDetailsPage />} />
              <Route path="/catalog/:id/review" element={<WriteReviewPage />} />

              <Route path={ROUTES.about} element={<AboutPage />} />
              <Route path={ROUTES.history} element={<HistoryPage />} />
              <Route path={ROUTES.quiz} element={<QuizPage />} />
              <Route path={ROUTES.auth} element={<AuthPage />} />
              <Route path={ROUTES.profile} element={<ProfilePage />} />
            </Route>
          </Routes>
        </AppProviders>
      </HashRouter>
    </QueryClientProvider>
  );
};
