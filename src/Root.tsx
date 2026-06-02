import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { CatalogPage } from "./pages/CatalogPage";
import { FavoritesProvider } from "./context/FavoritesContext";
import { WineDetailsPage } from "./pages/WineDetailsPage";
import { WriteReviewPage } from "./pages/WriteReviewPage";
import { AboutPage } from "./pages/AboutPage";

export const Root: React.FC = () => {
  return (
    <FavoritesProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<WineDetailsPage />} />
            <Route path="/catalog/:id/review" element={<WriteReviewPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </FavoritesProvider>
  );
};
