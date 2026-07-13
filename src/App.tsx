import { Outlet, useLocation } from "react-router-dom";

import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

import "./App.scss";

export const App = () => {
  const location = useLocation();

  const shouldHideFooter =
    location.pathname.includes("/review") ||
    location.pathname.startsWith("/quiz") ||
    location.pathname.startsWith("/auth");

  return (
    <div className="App">
      <Header />

      <main className="content">
        <Outlet />
      </main>

      {!shouldHideFooter && <Footer />}
    </div>
  );
};