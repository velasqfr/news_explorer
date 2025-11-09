import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <section className="search__content">
      <h2 className="search__title">What's going on in the World?</h2>
      <p className="search__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>

      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter topic"
          className="search__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" className="search__button">
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
