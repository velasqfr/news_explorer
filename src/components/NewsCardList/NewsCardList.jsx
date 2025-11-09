import React, { useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import "./NewsCardList.css";
import nothing from "../../images/no_results.svg";

import { mockArticles } from "../../utils/mockArticles";

const NewsCardList = ({ articles = [], isLoading, noResults }) => {
  const articlesPerPage = 3;
  const [visibleArticles, setVisibleArticles] = useState(articlesPerPage);

  useEffect(() => {
    // whenever the articles prop changes, reset how many are visible
    setVisibleArticles(articlesPerPage);
  }, [articles]); // <–– dependency array: runs when `articles` changes

  const handleShowMore = () => {
    setVisibleArticles((prev) => prev + articlesPerPage);
  };

  const articlesToDisplay = Array.isArray(articles)
    ? articles.slice(0, visibleArticles)
    : [];

  // Show preloader only while searching
  if (isLoading) return <Preloader />;

  return (
    <section className="news__card-list-section">
      {!noResults && <h2 className="news__card-list-title">Search results</h2>}

      {noResults ? (
        <div className="news__card-list-no-result">
          <img src={nothing} alt="no results" className="no__results-icon" />
          <h3 className="no__results-title"> Nothing Found</h3>

          <p className="no__results-text">
            Sorry, but nothing matched your search terms
          </p>
        </div>
      ) : (
        <>
          <div className="news__card-list">
            {articlesToDisplay.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>

          {visibleArticles < articles.length && (
            <div className="news__card-list-footer">
              <button className="show__more-btn" onClick={handleShowMore}>
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NewsCardList;
