import { createRoot } from "react-dom/client";

import { Root } from "./Root";

import "./index.scss";
import { ThemeProvider } from "./context/ThemeContext";
window.history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Root />
  </ThemeProvider>
);
