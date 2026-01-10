import { useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import "./NewsCardList.css";
import nothing from "../../images/no_results.svg";

const NewsCardList = ({
  articles = [],
  onSaveArticle,
  savedArticles,
  isLoggedIn,
  isLoading,
  noResults,
  currentSearchTerm,
}) => {
  const articlesPerPage = 3;
  const [visibleArticles, setVisibleArticles] = useState(articlesPerPage);

  useEffect(() => {
    // Reset visible articles whenever the articles change
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
          <img
            src={nothing}
            alt="no results"
            className="news__card-list__no-results-icon"
          />
          <h3 className="news__card-list__no-results-title"> Nothing Found</h3>

          <p className="news__card-list__no-results-text">
            Sorry, but nothing matched your search terms
          </p>
        </div>
      ) : (
        <>
          <div className="news__card-list">
            {articlesToDisplay.map((article, index) => (
              <NewsCard
                key={article.url || index} // index is the fallback
                article={article}
                onSave={() => onSaveArticle(article, currentSearchTerm)}
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
              />
            ))}
          </div>

          {visibleArticles < articles.length && (
            <div className="news__card-list-footer">
              <button
                className="news__card-list__show-more-btn"
                onClick={handleShowMore}
              >
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
