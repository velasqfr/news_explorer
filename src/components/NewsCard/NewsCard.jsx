import React from "react";
import "./NewsCard.css";

const NewsCard = ({ article }) => {
  const { title, description, url, urlToImage, publishedAt, source } = article;

  return (
    <div className="news__card">
      {urlToImage && <img src={urlToImage} alt={title} />}
      <div className="news__card-content">
        <p className="news__card-date">
          {new Date(publishedAt).toLocaleDateString()}
        </p>

        <h3 className="news__card-title">{title}</h3>

        <p className="news__card-desciption">{description}</p>
        <p className="news__card-source">{source.name}</p>
        <a href={url} target="_blank" rel="noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
