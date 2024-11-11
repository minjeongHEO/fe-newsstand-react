import React, { useEffect, useState } from 'react';
import styles from './ListNews.module.scss';

export default function ListNews({ newsData, tabType }) {
  const [categories, setCategories] = useState([]);
  const [listNewsData, setListNewsData] = useState(null);
  const [currentPageNewsData, setCurrentPageNewsData] = useState(null);

  const [page, setPage] = useState(0);
  const [clickedCategory, setClickedCategory] = useState(0);

  const NEWS_DATA_MAP = {
    ALL_PRESS: newsData.news,
    SUBSCRIBED_PRESS: newsData.subscribe,
  };

  const extractNewsByCategory = (newsData) => {
    const initialArray = Array.from({ length: categories.length }, () => []);
    return newsData.reduce((acc, cur) => {
      const index = categories.indexOf(cur.category);
      if (index !== -1) acc[index].push(cur);
      return acc;
    }, initialArray);
  };

  const extractCategories = (newsData) => [...new Set(newsData.map(({ category }) => category))];

  const getCurrentNewsData = (subscribeType) => NEWS_DATA_MAP[subscribeType] || [];

  useEffect(() => {
    const currentNewsData = getCurrentNewsData(tabType.subscribe);
    setCategories(extractCategories(currentNewsData));
  }, [tabType.subscribe, newsData]);

  useEffect(() => {
    const currentNewsData = getCurrentNewsData(tabType.subscribe);
    setListNewsData(extractNewsByCategory(currentNewsData));
  }, [tabType.subscribe, categories, newsData]);

  useEffect(() => {
    if (!listNewsData || !listNewsData.length) return;
    setCurrentPageNewsData(listNewsData[clickedCategory][page]);
  }, [tabType.subscribe, listNewsData, clickedCategory, page]);

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

      {currentPageNewsData && (
        <>
          <div className={styles.media__news_container}>
            <div className={styles.media__news_logo}>
              <a href="#">
                <img src={currentPageNewsData.logoImageSrc} height="20" width="auto" alt={currentPageNewsData.pressName} />
              </a>
              <span class={styles.media__news_time}>{currentPageNewsData.editedTime}</span>
              <button type="button" class={styles.media__news_subscribe_btn} aria-pressed="${pressedStatus}">
                구독 버튼
              </button>
            </div>

            <div class={styles.media__news_datas}>
              <div class={styles.media__news__main}>
                <a target="_blank" class={styles.media__news__main__link} href={currentPageNewsData.headline.href}>
                  <img src={currentPageNewsData.headline.thumbnailSrc} alt={currentPageNewsData.headline.title} />
                </a>
                <a target="_blank" class={styles.media__news__main__head_line} href={currentPageNewsData.headline.href}>
                  {currentPageNewsData.headline.title}
                </a>
              </div>

              <ul class={styles.media__news__sub}>
                {currentPageNewsData.sideNews.map(({ href, title }) => (
                  <li>
                    <a target="_blank" href={href}>
                      {title}
                    </a>
                  </li>
                ))}
                <li> {currentPageNewsData.pressName} 언론사에서 직접 편집한 뉴스입니다.</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
