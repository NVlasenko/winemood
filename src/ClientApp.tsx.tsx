import {
  lazy,
  Suspense,
  type ReactNode,
} from "react";

import {
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/reactQuery";

import { App } from "@/App";

import { ScrollToTop } from "@/components/layout/ScrollToTop/ScrollToTop";

import { FavoritesProvider } from "@/context/FavoritesContext";
import { AuthRequiredProvider } from "@/context/AuthRequiredContext";

import { QuizSessionProvider } from "@/context/QuizSessionContext";
import { AuthProvider } from "@/context/AuthContext";
import { AnalyticsSessionTracker } from "./components/analytics/AnalyticsSessionTracker";
import { AnalyticsPageViewTracker } from "./components/analytics/AnalyticsPageViewTracker";


const CatalogPage = lazy(() =>
  import("@/pages/CatalogPage").then((module) => ({
    default: module.CatalogPage,
  })),
);

const WineDetailsPage = lazy(() =>
  import("@/pages/WineDetailsPage").then((module) => ({
    default: module.WineDetailsPage,
  })),
);

const WriteReviewPage = lazy(() =>
  import("@/pages/WriteReviewPage").then((module) => ({
    default: module.WriteReviewPage,
  })),
);

const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((module) => ({
    default: module.AboutPage,
  })),
);

const HistoryPage = lazy(() =>
  import("@/pages/HistoryPage").then((module) => ({
    default: module.HistoryPage,
  })),
);

const QuizPage = lazy(() =>
  import("@/pages/QuizPage").then((module) => ({
    default: module.QuizPage,
  })),
);

const AuthPage = lazy(() =>
  import("@/pages/AuthPage").then((module) => ({
    default: module.AuthPage,
  })),
);

const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage").then((module) => ({
    default: module.ProfilePage,
  })),
);

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

const AppProviders = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <AuthProvider>
      <AuthRequiredProvider>
        <FavoritesProvider>
          <QuizSessionProvider>
            {children}
          </QuizSessionProvider>
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
          <AnalyticsSessionTracker />
          <AnalyticsPageViewTracker />

          <ScrollToTop />

          <Suspense fallback={null}>
            <Routes>
              <Route
                path={ROUTES.home}
                element={<App />}
              >


                <Route
                  path={ROUTES.catalog}
                  element={<CatalogPage />}
                />

                <Route
                  path="/catalog/:id"
                  element={<WineDetailsPage />}
                />

                <Route
                  path="/catalog/:id/review"
                  element={<WriteReviewPage />}
                />

                <Route
                  path={ROUTES.about}
                  element={<AboutPage />}
                />

                <Route
                  path={ROUTES.history}
                  element={<HistoryPage />}
                />

                <Route
                  path={ROUTES.quiz}
                  element={<QuizPage />}
                />

                <Route
                  path={ROUTES.auth}
                  element={<AuthPage />}
                />

                <Route
                  path={ROUTES.profile}
                  element={<ProfilePage />}
                />
              </Route>
            </Routes>
          </Suspense>
        </AppProviders>
      </HashRouter>
    </QueryClientProvider>
  );
};