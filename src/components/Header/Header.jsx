import { Link } from "react-router-dom";
import "./Header.css";
import logout from "../../images/logoutw.svg";

function Header({
  isLoggedIn,
  currentUser,
  isSavedNewsPage,
  onSignInClick,
  onSignOutClick,
}) {
  return (
    <header className={`header ${isLoggedIn ? "header__logged-in" : ""}`}>
      <div className="header__container">
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

          {isLoggedIn ? (
            <button className="header__sign-out" onClick={onSignOutClick}>
              {currentUser?.name || currentUser?.username || "User"}
              <img src={logout} alt="Log out" className="signout__icon" />
            </button>
          ) : (
            <button className="header__sign-in" onClick={onSignInClick}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
