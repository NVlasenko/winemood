import { NavLink } from "react-router-dom";
import searchIcon from "../../assets/images/icons/search.svg";
import iconProfile from "../../assets/images/icons/icon-account.svg";
import { useState } from "react";
import { navLinks } from "../../constants/navigation";
import "./Header.scss";
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="header__logo" onClick={closeMenu}>
          Vinoteca
        </NavLink>

        <nav
          className={
            isMenuOpen ? "header__nav header__nav--open" : "header__nav"
          }
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "header__nav-link header__nav-link--active"
                  : "header__nav-link"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <button className="header__icon" type="button" aria-label="Search">
            <img src={searchIcon} alt="Search" />
          </button>

          <button className="header__icon" type="button" aria-label="Profile">
            <img src={iconProfile} alt="Profile" />
          </button>
        </div>

        <button
          className={
            isMenuOpen
              ? "header__burger header__burger--open"
              : "header__burger"
          }
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          onBlur={(event) => event.currentTarget.blur()}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};
