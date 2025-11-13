import React, { useState } from "react";
import "./SavedNews.css";
import trash from "../../images/trash.svg";

function SavedNews({ currentUser, savedArticles, onDeleteArticle }) {
  const [showRemovedMsg, setShowRemovedMsg] = useState(null);

  const articleCount = savedArticles.length;

  // Get unique keywords from all saved articles
  const keywords = [...new Set(savedArticles.map((a) => a.keyword))];

  // Get top 2 keywords for display, and count remaining
  const topKeywords = keywords.slice(0, 2).join(",");
  const remainingCount = keywords.length - 2; // calculates hw many keywords are left beyond the first two

  const handleDelete = (url) => {
    if (showRemovedMsg === url) {
      onDeleteArticle(url);
      setShowRemovedMsg(null);
    } else {
      setShowRemovedMsg(url);

      setTimeout(() => {
        setShowRemovedMsg((prev) => (prev === url ? null : prev));
      }, 2000);
    }
  };
  return (
    <section className="saved-news">
      <div className="saved-news__info">
        <p className="saved-news__subtitle">Saved articles</p>
        <h1 className="saved-news__title">
          {currentUser?.name || currentUser?.username || "User"}, you have{" "}
          {articleCount} saved {articleCount == 1 ? "article" : "articles"}
        </h1>

        {articleCount > 0 && keywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keywords-highlight">
              {topKeywords}
              {remainingCount > 0 && `, and ${remainingCount} other`}
            </span>
          </p>
        )}
      </div>

      {articleCount == 0 ? (
        <p className="saved-news__empty">You have no saved articles</p>
      ) : (
        <div className="saved-news__cards">
          {savedArticles.map((article) => (
            <div key={article.url} className="saved-news__card">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="saved-news__card-img"
                />
              )}

              <button
                className="saved-news__delete-btn"
                onClick={() => handleDelete(article.url)} // will switch to article.url once API connected
                aria-label={`Delete ${article.title}`}
              >
                <img src={trash} alt="trash icon" className="trash__icon" />
              </button>

              {showRemovedMsg === article.url && (
                <p className="saved-news__card-msg">Remove from saved</p>
              )}

              {article.keyword && (
                <div className="saved-news__keyword-badge">
                  {article.keyword}
                </div>
              )}

              <div className="saved-news__card-content">
                {article.publishedAt && (
                  <p className="saved-news__card-date">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
                <h3 className="saved-news__card-title">{article.title}</h3>
                {article.description && (
                  <p className="saved-news__card-description">
                    {article.description}
                  </p>
                )}
                {article.source?.name && (
                  <p className="saved-news__card-source">
                    {article.source.name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedNews;
