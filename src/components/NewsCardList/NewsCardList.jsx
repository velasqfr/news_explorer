import React, { useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import "./NewsCardList.css";

import { mockArticles } from "../../utils/mockArticles";

const NewsCardList = () => {
  const articlesPerPage = 3;
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(articlesPerPage);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setArticles(mockArticles);
      setIsLoading(false);
    }, 1000); // 1 second delay
  }, []);

  // Triggered when user clicks "Show More"
  const handleShowMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleArticles((prev) => prev + articlesPerPage);
      setIsLoading(false);
    }, 500);
  };

  const articlesToDisplay = articles.slice(0, visibleArticles);

  // Show preloader only while searching
  if (isLoading) return <Preloader />;

  return (
    <section className="news__card-list-section">
      <h2 className="news__card-list-title"> Search results</h2>

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
    </section>
  );
};

export default NewsCardList;
