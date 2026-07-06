import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import searchIcon from "@/assets/images/icons/search.svg";
import iconProfile from "@/assets/images/icons/icon-account.svg";
import { navLinks } from "@/constants/navigation";

import "./Header.scss";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, location.pathname, location.search]);

  const handleSearchClick = useCallback(() => {
    closeMenu();
    navigate("/catalog?searchOpen=true");
  }, [closeMenu, navigate]);

  const handleProfileClick = useCallback(() => {
    closeMenu();
    navigate("/profile");
  }, [closeMenu, navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <NavLink to="/" className="header__logo" onClick={closeMenu}>
            Vinoteca
          </NavLink>

          <nav
            className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}
          >
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `header__nav-link ${
                    isActive ? "header__nav-link--active" : ""
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
              <img src={searchIcon} alt="" aria-hidden="true" />
            </button>

            <button
              className="header__icon"
              type="button"
              aria-label="Profile"
              onClick={handleProfileClick}
            >
              <img src={iconProfile} alt="" aria-hidden="true" />
            </button>
          </div>

          <button
            className={`header__burger ${
              isMenuOpen ? "header__burger--open" : ""
            }`}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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