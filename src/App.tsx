import React from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
