import {
  createCookie,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "react-router";

import { QueryClientProvider } from "@tanstack/react-query";

import { App } from "@/App";

import { AnalyticsPageViewTracker } from "@/components/analytics/AnalyticsPageViewTracker";
import { AnalyticsSessionTracker } from "@/components/analytics/AnalyticsSessionTracker";

import { AuthRequiredProvider } from "@/context/AuthRequiredContext";
import { MoodThemeProvider } from "@/context/MoodThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { QuizSessionProvider } from "@/context/QuizSessionContext";

import { userApi } from "@/shared/api/userApi";
import { queryClient } from "@/shared/lib/reactQuery";

import { moodThemeValues } from "@/data/moodThemes";

import type { MoodTheme } from "@/types/mood";
import type { WineCatalogCard } from "@/types/wineCatalogCard";

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

  let favoriteWines: WineCatalogCard[] = [];

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

export default function Root() {
  const {
    moodTheme,
    favoriteWines,
  } = useLoaderData<
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
                <AnalyticsSessionTracker />
                <AnalyticsPageViewTracker />

                <App />
              </QuizSessionProvider>
            </FavoritesProvider>
          </AuthRequiredProvider>
        </AuthProvider>
      </MoodThemeProvider>
    </QueryClientProvider>
  );
}