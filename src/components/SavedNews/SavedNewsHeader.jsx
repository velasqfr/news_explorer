import { Link, useNavigate, useState, useEffect } from "react-router-dom";
import "./SavedNewsHeader.css";
import "../Header/Header";
import logout from "../../images/logout.svg";
import menuCloseIcon from "../../images/menuSaveIcon.svg";

function SavedNewsHeader({ currentUser, onSignOutClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  return (
    <header className="header saved-news__header">
      <div className="header__container">
        <h1 className="header__logo">News Explorer</h1>

        {/* Mobile Hamburger */}
        <button
          classsName="header__hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img src={isMenuOpen ? closeIcon : menuCloseIcon} alt="Menu" />
        </button>

        <div className="header__menu">
          <nav className="header__nav">
            <Link to="/" className="header__link">
              Home
            </Link>
            <Link to="/saved-news" className="header__link active">
              Saved Articles
            </Link>
          </nav>

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

      {/* Drawer and overlay */}
      {isMenuOpen && (
        <>
          <div className="header__drawer">
            <nav className="header__nav-drawer">
              <Link to="/" className="header__nav-home">
                Home
              </Link>
              <Link to="/saved-news" className="header__nav-home active">
                Saved Articles
              </Link>
              <button className="drawer__signout-btn" onClick={onSignOutClick}>
                Sign Out
              </button>
            </nav>
          </div>
          <div className="header__overlay" onClick={toggleMenu}></div>
        </>
      )}
    </header>
  );
}

export default SavedNewsHeader;
