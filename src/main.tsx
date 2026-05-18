import { createRoot } from "react-dom/client";
import { Root } from "./Root";
import "./index.scss";
import { MoodThemeProvider } from "./context/MoodThemeContext";

window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(
  <MoodThemeProvider>
    <Root />
  </MoodThemeProvider>
);
