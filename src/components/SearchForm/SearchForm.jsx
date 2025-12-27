import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      // added to prevent empty search
      setError("Please insert search input");
      return;
    }
    setError(""); // clear error on valid search
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
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError("");
          }}
        />

        <button type="submit" className="search__button">
          Search
        </button>
        {error && <span className="search__error">{error}</span>}
      </form>
    </section>
  );
}

export default SearchForm;
