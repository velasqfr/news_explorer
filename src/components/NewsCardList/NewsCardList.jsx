import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

import { mockArticles } from "../../utils/mockArticles";

const NewsCardList = () => {
  return (
    <div className="news__card-list">
      {mockArticles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsCardList;
