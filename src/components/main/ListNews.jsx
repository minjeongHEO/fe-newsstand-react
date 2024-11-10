import React, { useEffect, useState } from 'react';
import styles from './ListNews.module.scss';

export default function ListNews({ newsData, tabType, page }) {
  const [clickedCategory, setClickedCategory] = useState(0);
  const [listNewsData, setListNewsData] = useState([[]]);
  const [categories, setCategories] = useState([]);

  const extractCategories = (newsData) => [...new Set(newsData.map(({ category }) => category))];

  const NEWS_DATA_MAP = {
    ALL_PRESS: newsData.news,
    SUBSCRIBED_PRESS: newsData.subscribe,
  };

  useEffect(() => {
    const currentNewsData = NEWS_DATA_MAP[tabType.subscribe] || [];
    setCategories(extractCategories(currentNewsData));
  }, [tabType.subscribe]);

  return (
    <div>
      <div className={styles.media__category_bar}>
        {categories.map((category, idx) => {
          return (
            <div key={`category${idx}`}>
              <span>{category}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.media__news_container}>리스트 뉴스입니다.</div>
    </div>
  );
}
