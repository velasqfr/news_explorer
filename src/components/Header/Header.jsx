import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logout from "../../images/logoutw.svg";
import menuOpenIcon from "../../images/menuHomeIcon.svg";
import closeIcon from "../../images/close.svg";
// import menuCloseIcon from "../../images/menuSaveIcon.svg";

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

  const closeMenu = (event) => {
    if (event.target.closest(".header__menu") === null) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isMenuOpen]);

  return (
    <header className={`header ${isLoggedIn ? "header__logged-in" : ""}`}>
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
              <img src={logout} alt="Log out" className="signout__icon" />
            </button>
          ) : (
            /* Sign In */
            <button className="header__sign-in" onClick={onSignInClick}>
              Sign In
            </button>
          )}
        </div>

        {isMenuOpen && (
          <div className="header__drawer">
            <nav className="header__nav-drawer">
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

              {!isLoggedIn && (
                <button className="drawer__signin-btn" onClick={onSignInClick}>
                  Sign In
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
