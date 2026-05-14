import React from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";
import { Header } from "./components/Header";
// import { AnimatedPage } from "./pages/AnimatedPage/AnimatedPage";

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="content">
        {/* <AnimatedPage> */}
          <Outlet />
        {/* </AnimatedPage> */}
      </main>
    </div>
  );
};
