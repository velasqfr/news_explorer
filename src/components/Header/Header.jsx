import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logout from "../../images/logoutw.svg";
import menuOpenIcon from "../../images/menuHomeIcon.svg";
import closeIcon from "../../images/close.svg";

function Header({
  isLoggedIn,
  currentUser,
  isSavedNewsPage,
  onSignInClick,
  onSignOutClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const closeMenu = (event) => {
      if (event.target.closest(".header__menu") === null) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  return (
    <header className={`header ${isLoggedIn ? "header--logged-in" : ""}`}>
      <div
        className={`header__container ${isMenuOpen ? "header__container--open" : ""}`}
      >
        <h1 className="header__logo">NewsExplorer</h1>

        <div className="header__menu">
          <nav className="header__nav">
            <Link to="/" className={!isSavedNewsPage ? "active" : ""}>
              Home
            </Link>

            {isLoggedIn && (
              <Link
                to="/saved-news"
                className={isSavedNewsPage ? "active" : ""}
              >
                Saved Articles
              </Link>
            )}
          </nav>
          {/* Hamburger */}
          <button
            className="header__hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <img src={isMenuOpen ? closeIcon : menuOpenIcon} alt="Menu" />
          </button>

          {isLoggedIn ? (
            <button className="header__sign-out" onClick={onSignOutClick}>
              {currentUser?.name || currentUser?.username || "User"}
              <img
                src={logout}
                alt="Log out"
                className="header__signout-icon"
              />
            </button>
          ) : (
            /* Sign In */
            <button className="header__sign-in" onClick={onSignInClick}>
              Sign In
            </button>
          )}
        </div>

        {/* Drawer and overlay */}
        {isMenuOpen && (
          <>
            <div className="header__drawer">
              <h1 className="header__drawer-logo">NewsExplorer</h1>
              <nav className="header__nav-drawer">
                {/* Home link */}
                <Link
                  to="/"
                  className={`header__nav-link--home ${!isSavedNewsPage ? "active" : ""}`}
                >
                  Home
                </Link>

                {/* Only show Saved Articles if logged in */}
                {isLoggedIn && (
                  <Link
                    to="/saved-news"
                    className={`header__nav-link--saved ${isSavedNewsPage ? "active" : ""}`}
                  >
                    Saved Articles
                  </Link>
                )}

                {/* Sign In button when not logged in */}
                {!isLoggedIn && (
                  <button
                    className="header__drawer-signin-btn"
                    onClick={onSignInClick}
                  >
                    Sign In
                  </button>
                )}

                {/* Sign Out button when logged in */}
                {isLoggedIn && (
                  <button
                    className="header__drawer-signout-btn"
                    onClick={onSignOutClick}
                  >
                    Sign Out
                  </button>
                )}
              </nav>
            </div>
            {/* Overlay to close the drawer when clicked outside */}
            <div
              className="header__overlay"
              onClick={() => setIsMenuOpen(false)}
            ></div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
