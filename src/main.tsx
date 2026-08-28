import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { MoodThemeProvider } from "@/context/MoodThemeContext";
import { Root } from "@/ClientApp.tsx";

import "@/index.scss";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <MoodThemeProvider>
      <Root />
    </MoodThemeProvider>
  </StrictMode>,
);