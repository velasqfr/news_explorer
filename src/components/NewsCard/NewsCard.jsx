import { useState } from "react";
import "./NewsCard.css";

const NewsCard = ({ article, onSave, isLoggedIn, savedArticles }) => {
  const { title, description, url, urlToImage, publishedAt, source } = article;
  const [showMessage, setShowMessage] = useState(false);

  const isSaved = savedArticles.some((a) => a.url === url);

  const handleSave = () => {
    if (!isLoggedIn) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000); // shows message for 2 seconds

      return;
    }
    onSave(article);
  };

  return (
    <div className="news__card">
      {urlToImage && <img src={urlToImage} alt={title} />}
      <button
        className={`news__card-save-btn ${isSaved ? "active" : ""}`}
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

        <h3 className="news__card-title">{title}</h3>

        <p className="news__card-description">{description}</p>
        <p className="news__card-source">{source?.name || "Unknown Source"}</p>
        <a href={url} target="_blank" rel="noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
