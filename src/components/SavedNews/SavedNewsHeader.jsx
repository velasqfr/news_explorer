import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SavedNewsHeader.css";
import "../Header/Header";
import logout from "../../images/logout.svg";
import menuSaveIcon from "../../images/menuSaveIcon.svg";
import closeIcon from "../../images/close.svg";

function SavedNewsHeader({ currentUser, onSignOutClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // CLose draer when clicking outside
  useEffect(() => {
    const closeMenu = (event) => {
      if (
        !event.target.closest(".header__menu") &&
        !event.target.closest(".header__drawer")
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

  // Close drawer on ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <header className="header saved-news__header">
        <div
          className={`header__container ${isMenuOpen ? "header__container--open" : ""}`}
        >
          <h1 className="header__logo">News Explorer</h1>
          <div className="header__menu">
            <nav className="header__nav">
              <Link to="/" className="header__link">
                Home
              </Link>
              <Link to="/saved-news" className="header__link active">
                Saved Articles
              </Link>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="header__hamburger"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <img src={isMenuOpen ? closeIcon : menuSaveIcon} alt="Menu" />
            </button>

            <button
              className="header__sign-out"
              onClick={() => {
                onSignOutClick();
                navigate("/");
              }}
            >
              {currentUser?.name || currentUser?.username || "User"}
              <img src={logout} alt="Log out" className="signout__icon" />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer and overlay for mobile */}
      {isMenuOpen && (
        <>
          <div className="savednews__drawer">
            <nav className="header__nav-drawer">
              <Link to="/" className="header__nav-home">
                Home
              </Link>
              <button className="drawer__signout-btn" onClick={onSignOutClick}>
                Sign Out
              </button>
            </nav>
          </div>
          <div
            className={`header__overlay ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          ></div>
        </>
      )}
    </>
  );
}

export default SavedNewsHeader;
