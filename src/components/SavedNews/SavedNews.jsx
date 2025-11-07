import React from "react";
import "./SavedNews.css";
import trash from "../../images/trash.svg";

function SavedNews({ savedArticles, onDeleteArticle }) {
  return (
    <section className="saved-news">
      <h1 className="saved-news__title">Saved Articles</h1>

      {savedArticles.length === 0 ? (
        <p className="saved-news__empty">You have no saved articles</p>
      ) : (
        <div className="saved-news__cards">
          {savedArticles.map((article) => (
            <div key={article.id} className="saved-news__card">
              <h3 className="saved-news__card-title">{article.title}</h3>
              <p className="article keyword">{article.keyword}</p>
              <button className="saved-news__delete-btn">
                <img src={trash} alt="trash icon" className="trash__icon" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedNews;
