import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

import { mockArticles } from "../../utils/mockArticles";

const NewsCardList = () => {
  const articlesPerPage = 3;
  const [visibleArticles, setVisibleArticles] = useState(articlesPerPage);

  const handleShowMore = () => {
    setVisibleArticles((prev) => prev + articlesPerPage);
  };

  const articlesToDisplay = mockArticles.slice(0, visibleArticles);

  return (
    <section className="news__card-list-section">
      <h2 className="news__card-list-title"> Search Results</h2>

      <div className="news__card-list">
        {articlesToDisplay.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>

      {visibleArticles < mockArticles.length && (
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
