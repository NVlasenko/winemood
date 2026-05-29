import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import "./App.scss";

export const App: React.FC = () => {
  const location = useLocation();

  const isWriteReviewPage =
    location.pathname.includes("/review");

  return (
    <div className="App">
      <Header />

      <main className="content">
        <Outlet />
      </main>

      {!isWriteReviewPage && <Footer />}
    </div>
  );
};