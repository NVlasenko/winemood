import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { MoodThemeProvider } from "@/context/MoodThemeContext";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/shared/lib/reactQuery";
import "@/index.scss";

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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

        <title>WineMood — Find Wine for Your Mood</title>

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
  return (
    <QueryClientProvider client={queryClient}>
      <MoodThemeProvider>
        <Outlet />
      </MoodThemeProvider>
    </QueryClientProvider>
  );
}