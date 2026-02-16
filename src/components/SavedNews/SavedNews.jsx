import { useState, useEffect } from "react";
import "./SavedNews.css";
import trash from "../../images/trash.svg";

function SavedNews({ currentUser, savedArticles, onDeleteArticle }) {
  const [showRemovedMsg, setShowRemovedMsg] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 629);

  // ---------------------------- TRUNCATION FUNCTION -------------------------------- //
  const truncateText = (text, maxLines = 4, approxCharsPerLine = 30) => {
    if (!text) return "";
    const maxChars = maxLines * approxCharsPerLine;
    if (text.length <= maxChars) return text;

    // Truncate at the last space so we don't cut mid word
    let truncated = text.slice(0, maxChars);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) {
      truncated = truncated.slice(0, lastSpace);
    }
    return truncated + "...";
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 629);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const articleCount = savedArticles.length;

  // Count how often each keyword appears
  const getKeywordCounts = (articles) => {
    const counts = {};
    articles.forEach((article) => {
      const key = article.keyword || "News";
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  };

  const keywordCount = getKeywordCounts(savedArticles);

  // Sort keywords by frequesncy (descending)
  const sortedKeywords = Object.entries(keywordCount)
    .sort((a, b) => b[1] - a[1])
    .map(([keyword]) => keyword);

  // Building the "By Keywords" display text
  let keywordsDisplay = "";
  if (sortedKeywords.length > 2) {
    keywordsDisplay = `${sortedKeywords[0]}, ${sortedKeywords[1]} and ${sortedKeywords.length - 2} other${sortedKeywords.length - 2 > 1 ? "s" : ""}`;
  } else {
    keywordsDisplay = sortedKeywords.join(", ");
  }

  const handleDelete = (url) => {
    if (showRemovedMsg === url) {
      onDeleteArticle(url);

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

        {articleCount > 0 && sortedKeywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keywords-highlight">
              {keywordsDisplay}
            </span>
          </p>
        )}
      </div>

      {articleCount == 0 ? (
        <p className="saved-news__empty">You have no saved articles</p>
      ) : (
        <div className="saved-news__cards">
          {savedArticles.map((article, index) => (
            <div key={`${article.url}_${index}`} className="saved-news__card">
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
                onMouseEnter={() => setShowRemovedMsg(article.url)}
                onMouseLeave={() => setShowRemovedMsg(null)}
              >
                <img
                  src={trash}
                  alt="trash icon"
                  className="saved-news__trash-icon"
                />
              </button>

              {showRemovedMsg === article.url && (
                <span className="saved-news__card__msg">Remove from saved</span>
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
                <h3 className="saved-news__card-title">
                  {isMobile
                    ? article.title
                    : truncateText(article.title, 2, 15)}
                </h3>
                {article.description && (
                  <p className="saved-news__card-description">
                    {isMobile
                      ? article.description
                      : truncateText(article.description, 4, 24)}
                  </p>
                )}
                {article.source?.name && (
                  <p className="saved-news__card-source">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="saved-news__card-link"
                    >
                      {article.source.name}
                    </a>
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
