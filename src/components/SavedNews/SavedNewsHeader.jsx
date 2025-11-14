import { Link, useNavigate } from "react-router-dom";
import "./SavedNewsHeader.css";
import "../Header/Header";
import logout from "../../images/logout.svg";

function SavedNewsHeader({ currentUser, onSignOutClick }) {
  const navigate = useNavigate();

  return (
    <header className="header saved-news__header">
      <div className="header__container">
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
  );
}

export default SavedNewsHeader;
