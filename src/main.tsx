import { createRoot } from "react-dom/client";

import { MoodThemeProvider } from "@/context/MoodThemeContext";
import { Root } from "@/Root";

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
  <MoodThemeProvider>
    <Root />
  </MoodThemeProvider>,
);
