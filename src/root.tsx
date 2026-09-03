import {
  createCookie,
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  useRouteLoaderData,
} from "react-router";

import { useEffect } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { App } from "@/App";

import { AnalyticsPageViewTracker } from "@/components/analytics/AnalyticsPageViewTracker";
import { AnalyticsSessionTracker } from "@/components/analytics/AnalyticsSessionTracker";
import { NavigationLoadingOverlay } from "@/components/ui/NavigationLoadingOverlay";

import { AppLoadingProvider } from "@/context/AppLoadingContext";
import { AuthProvider } from "@/context/AuthContext";
import { AuthRequiredProvider } from "@/context/AuthRequiredContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { MoodThemeProvider } from "@/context/MoodThemeContext";
import { QuizSessionProvider } from "@/context/QuizSessionContext";

import { moodThemeValues } from "@/data/moodThemes";

import { getSiteAssets } from "@/shared/api/assets/siteAssetsApi";
import { userApi } from "@/shared/api/userApi";
import { queryClient } from "@/shared/lib/reactQuery";

import type { MoodTheme } from "@/types/mood";
import type { WineCatalogCard } from "@/types/wineCatalogCard";

import poppinsRegularUrl from "@/assets/fonts/Poppins-Regular.woff2?url";
import marcellusRegularUrl from "@/assets/fonts/Marcellus-Regular.woff2?url";

import "@/index.scss";


const MOOD_THEME_COOKIE_KEY =
  "moodTheme";


const accessTokenCookie =
  createCookie("accessToken", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: import.meta.env.PROD,
  });


const getMoodThemeFromCookie = (
  cookieHeader: string | null,
): MoodTheme => {
  if (!cookieHeader) {
    return "default";
  }

  const cookies =
    cookieHeader.split(";");

  for (const cookie of cookies) {
    const [key, ...valueParts] =
      cookie.trim().split("=");

    if (
      key !==
      MOOD_THEME_COOKIE_KEY
    ) {
      continue;
    }

    const value =
      decodeURIComponent(
        valueParts.join("="),
      );

    if (
      value &&
      value in moodThemeValues
    ) {
      return value as MoodTheme;
    }
  }

  return "default";
};


const getThemeStyle = (
  moodTheme: MoodTheme,
): React.CSSProperties => {
  const theme =
    moodThemeValues[moodTheme];

  return {
    "--background":
      theme.background,

    "--wine-glow-rgb":
      theme.glowRgb,

    "--button-gradient-start":
      theme.buttonGradientStart,

    "--button-gradient-end":
      theme.buttonGradientEnd,

    "--button-shadow":
      theme.buttonShadow,

    "--line-gradient-start":
      theme.lineGradientStart,

    "--line-gradient-end":
      theme.lineGradientEnd,

    "--line-shadow":
      theme.lineShadow,

    "--border-color":
      theme.borderColor,

    "--mood-link-color":
      theme.linkColor,

    "--mood-link-hover-color":
      theme.linkHoverColor,

    "--wine-background-start":
      theme.wineBackgroundStart,

    "--wine-background-middle":
      theme.wineBackgroundMiddle,

    "--wine-background-end":
      theme.wineBackgroundEnd,

    "--theme-icon-gradient-start":
      theme.themeIconGradientStart,

    "--theme-icon-gradient-end":
      theme.themeIconGradientEnd,
  } as React.CSSProperties;
};



export function links() {
  return [
    {
      rel: "preload",
      href: poppinsRegularUrl,
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      href: marcellusRegularUrl,
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
  ];
}


export async function loader({
  request,
}: {
  request: Request;
}) {
  const cookieHeader =
    request.headers.get("Cookie");

  const moodTheme =
    getMoodThemeFromCookie(
      cookieHeader,
    );

  const authToken =
    await accessTokenCookie.parse(
      cookieHeader,
    );

  let favoriteWines: WineCatalogCard[] =
    [];

  if (authToken) {
    try {
      favoriteWines =
        await userApi.getFavorites({
          authToken,
        });
    } catch (error) {
      console.error(
        "Root SSR favorites load failed:",
        error,
      );

      favoriteWines = [];
    }
  }

  return {
    moodTheme,
    favoriteWines,
  };
}


export function shouldRevalidate() {
  return false;
}


export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data =
    useRouteLoaderData<
      typeof loader
    >("root");


  /*
   * При нормальной загрузке тема приходит
   * из root loader.
   *
   * Если root loader завершился ошибкой,
   * данных loader здесь уже нет.
   *
   * Сам ErrorBoundary ниже отдельно
   * устанавливает CSS variables для
   * Preparing WineMood.
   */
  const moodTheme =
    data?.moodTheme ??
    "default";


  return (
    <html
      lang="en"
      style={
        getThemeStyle(
          moodTheme,
        )
      }
    >
      <head>
        <meta charSet="UTF-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <meta
          name="description"
          content="WineMood helps you discover wines by mood, taste, occasion, food pairing and personal preferences."
        />

        <link
          rel="icon"
          type="image/png"
          href="/favicon.png"
        />

        <title>
          WineMood — Find Wine for Your Mood
        </title>

        <Meta />
        <Links />
      </head>

      <body>
        {children}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export function ErrorBoundary() {
  const error =
    useRouteError();

  const rootData =
    useRouteLoaderData<
      typeof loader
    >("root");

  const moodTheme =
    rootData?.moodTheme ??
    "default";

  const isBackendUnavailable =
    isRouteErrorResponse(error) &&
    error.status === 503;

  useEffect(() => {
    if (!isBackendUnavailable) {
      return;
    }

    let cancelled = false;

    let retryTimer:
      | ReturnType<typeof setTimeout>
      | undefined;

    const checkBackend =
      async () => {
        try {
          await getSiteAssets();

          if (!cancelled) {
            window.location.reload();
          }
        } catch {
          if (!cancelled) {
            retryTimer =
              window.setTimeout(
                checkBackend,
                5_000,
              );
          }
        }
      };

    retryTimer =
      window.setTimeout(
        checkBackend,
        5_000,
      );

    return () => {
      cancelled = true;

      if (retryTimer) {
        window.clearTimeout(
          retryTimer,
        );
      }
    };
  }, [
    isBackendUnavailable,
  ]);

  if (isBackendUnavailable) {
    return (
      <div
        style={
          getThemeStyle(
            moodTheme,
          )
        }
      >
        <AppLoadingProvider>
          <NavigationLoadingOverlay
            forceVisible
          />
        </AppLoadingProvider>
      </div>
    );
  }

  console.error(
    "Unhandled route error:",
    error,
  );

  return (
    <main>
      <h1>
        Something went wrong
      </h1>

      <p>
        Please try again later.
      </p>
    </main>
  );
}


export default function Root() {
  const {
    moodTheme,
    favoriteWines,
  } =
    useLoaderData<
      typeof loader
    >();


  return (
    <QueryClientProvider
      client={queryClient}
    >
      <MoodThemeProvider
        initialMoodTheme={
          moodTheme
        }
      >
        <AuthProvider>
          <AuthRequiredProvider>
            <FavoritesProvider
              initialFavoriteWines={
                favoriteWines
              }
            >
              <QuizSessionProvider>
                <AppLoadingProvider>
                  <AnalyticsSessionTracker />

                  <AnalyticsPageViewTracker />

                  <App />
                </AppLoadingProvider>
              </QuizSessionProvider>
            </FavoritesProvider>
          </AuthRequiredProvider>
        </AuthProvider>
      </MoodThemeProvider>
    </QueryClientProvider>
  );
}