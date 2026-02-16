import { useState, useEffect } from "react";
import "./NewsCard.css";
import globalnews from "../../images/globalnews.svg";

const NewsCard = ({ article, onSave, isLoggedIn, savedArticles }) => {
  const { title, description, url, urlToImage, publishedAt, source } = article;
  const [showMessage, setShowMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 629);

  const isSaved = savedArticles.some((a) => a.url === url);

  const handleSave = () => {
    if (!isLoggedIn) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000); // shows message for 2 seconds

      return;
    }
    onSave(article);
  };

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

  return (
    <article className="news__card">
      <img
        src={urlToImage || globalnews}
        alt={title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = globalnews;
        }}
      />
      <button
        className={`news__card-save-btn ${isSaved ? "news__card-save-btn--active" : ""}`}
        aria-label={isSaved ? "Remove article" : "Save article"}
        onClick={handleSave}
      ></button>

      {showMessage && <p className="news__card-msg">Sign in to save article</p>}

      <div className="news__card-content">
        <p className="news__card-date">
          {new Date(publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h3 className="news__card-title">
          {isMobile ? title : truncateText(title, 2, 15)}
        </h3>

        <p className="news__card-description">
          {isMobile ? description : truncateText(description, 4, 24)}
        </p>
        <p className="news__card-source">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="news__card-link"
          >
            {source?.name || "Unknown Source"}
          </a>
        </p>
      </div>
    </article>
  );
};

export default NewsCard;
