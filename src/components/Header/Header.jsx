import React from "react";
import "./Header.css";

function Header({ onSignInClick }) {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo">NewsExplorer</h1>
        <div className="header__menu">
          <nav className="header__nav">
            <a href="/">Home</a>
          </nav>

          <button className="header__sign-in" onClick={onSignInClick}>
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
