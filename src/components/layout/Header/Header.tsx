import { useCallback, useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { useAuthRequired } from "@/context/AuthRequiredContext";

import searchIcon from "@/assets/images/icons/search.svg";
import iconProfile from "@/assets/images/icons/icon-account.svg";
import { navLinks } from "@/constants/navigation";

import "./Header.scss";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { isAuthenticated } = useAuth();
  const { openAuthRequired, closeAuthRequired } = useAuthRequired();

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    closeMenu();
    closeAuthRequired();
  }, [
    closeMenu,
    closeAuthRequired,
    location.pathname,
    location.search,
  ]);

  const handleSearchClick = useCallback(() => {
    closeMenu();


    if (location.pathname === "/catalog") {
      const nextParams = new URLSearchParams(searchParams);

      nextParams.set("searchOpen", "true");

      navigate(
        `/catalog${nextParams.toString() ? `?${nextParams.toString()}` : ""}`,
      );

      return;
    }

    navigate("/catalog?searchOpen=true");
  }, [
    closeMenu,
    location.pathname,
    navigate,
    searchParams,
  ]);

  const handleProfileClick = useCallback(() => {
    closeMenu();

    if (isAuthenticated) {
      navigate("/profile");

      return;
    }

    openAuthRequired({
      title: "Continue with an account",
      text: "Please sign up or log in to access your personal profile.",
    });
  }, [
    closeMenu,
    isAuthenticated,
    navigate,
    openAuthRequired,
  ]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <NavLink
            to="/"
            className="header__logo"
            onClick={closeMenu}
          >
            WineMood
          </NavLink>

          <nav
            className={`header__nav ${
              isMenuOpen ? "header__nav--open" : ""
            }`}
          >
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `header__nav-link ${
                    isActive
                      ? "header__nav-link--active"
                      : ""
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <button
              className="header__icon"
              type="button"
              aria-label="Search"
              onClick={handleSearchClick}
            >
              <img
                src={searchIcon}
                alt=""
                aria-hidden="true"
              />
            </button>

            <button
              className="header__icon"
              type="button"
              aria-label="Profile"
              onClick={handleProfileClick}
            >
              <img
                src={iconProfile}
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>

          <button
            className={`header__burger ${
              isMenuOpen
                ? "header__burger--open"
                : ""
            }`}
            type="button"
            aria-label={
              isMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};