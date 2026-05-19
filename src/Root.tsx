import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { CatalogPage } from "./pages/CatalogPage";
import { WineDetailsPage } from "./components/WineCatalogCard";

export const Root: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<WineDetailsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
