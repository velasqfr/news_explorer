import React from "react";
import "./SavedNewsHeader.css";
import "../Header/Header";

function SavedNewsHeader({ currentUser, onSignOutClick }) {
  return (
    <header className="header saved-news__header">
      <div className="header__container">
        <h1 className="header__logo">News Explorer</h1>

        <div className="header__menu">
          <nav className="header__nav">
            <a href="/" className="header__link">
              Home
            </a>
            <a href="/saved-news" className="header__link active">
              Saved Articles
            </a>
          </nav>

          <button className="header__sign-out" onClick={onSignOutClick}>
            {currentUser?.username || "User"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default SavedNewsHeader;
