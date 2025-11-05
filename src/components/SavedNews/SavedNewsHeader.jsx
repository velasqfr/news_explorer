import React from "react";
import "./SavedNewsHeader.css";
import "./Header.css";

function Header({ isLoggedIn, userName, onSignOut }) {
  return (
    <header className="savedNews__header">
      <div className="savedNews__header-container">
        <h1 className="header__logo">News Explorer</h1>
        <div className="savedNews__nav-container">
          <nav className="header__nav">
            <a href="/">Home</a>
            <a href="/saved-news" className="active">
              Saved Articles
            </a>
          </nav>
          <button className="header__sign-out" onClick={onSignOut}>
            user
          </button>
        </div>
      </div>
    </header>
  );
}

export default SavedNewsHeader;
