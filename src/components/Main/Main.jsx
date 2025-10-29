import React from "react";
import "./Main.css";
import headerImage from "../../images/Header.svg";

function Main() {
  return (
    <main className="hero">
      <section className="main__search">
        <h2 className="main__search-title">What's going on in the world?</h2>
        <p className="main__search-subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>

        <form className="main__search-form">
          <input
            type="text"
            placeholder="Enter topic"
            className="search__input"
          />
          <button type="submit" className="main__search-btn">
            Search
          </button>
        </form>
      </section>
    </main>
  );
}

export default Main;
