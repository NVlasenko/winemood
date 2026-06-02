import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import searchIcon from "../../assets/images/icons/search.svg";
import iconProfile from "../../assets/images/icons/icon-account.svg";
import { navLinks } from "../../constants/navigation";

import "./Header.scss";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchClick = () => {
    closeMenu();
    navigate("/catalog", { state: { openSearch: true } });
  };

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
              <img src={searchIcon} alt="" />
            </button>

            <button className="header__icon" type="button" aria-label="Profile">
              <img src={iconProfile} alt="" />
            </button>
          </div>

          <button
            className={`header__burger ${
              isMenuOpen ? "header__burger--open" : ""
            }`}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
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
