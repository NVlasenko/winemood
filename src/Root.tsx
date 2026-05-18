import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";

export const Root: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
