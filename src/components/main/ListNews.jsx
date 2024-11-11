import React, { useEffect, useState } from 'react';
import styles from './ListNews.module.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export default function ListNews({ newsData, tabType }) {
  const [categories, setCategories] = useState([]);
  const [listNewsData, setListNewsData] = useState(null);
  const [currentPageNewsData, setCurrentPageNewsData] = useState(null);

  const [page, setPage] = useState(0);
  const [clickedCategoryIndex, setClickedCategoryIndex] = useState(0);

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
    if (!listNewsData || !listNewsData[clickedCategoryIndex]) return;
    setCurrentPageNewsData(listNewsData[clickedCategoryIndex][page]);
  }, [tabType.subscribe, listNewsData, clickedCategoryIndex, page]);

  const handleCategoryClick = (idx) => {
    setClickedCategoryIndex(idx);
    setPage(0);
  };

  const prevArrowClick = () => {
    if (!page) {
      setClickedCategoryIndex((prevIndex) => (!prevIndex ? categories.length - 1 : prevIndex - 1));
      setPage(0);
      return;
    }
    setPage((prevPage) => prevPage - 1);
  };

  const nextArrowClick = () => {
    const maxPage = listNewsData[clickedCategoryIndex].length;
    if (page + 1 === maxPage) {
      setClickedCategoryIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
      setPage(0);
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <LeftOutlined className={styles.angle_left} onClick={prevArrowClick} />
      <div>
        <div className={styles.media__category_bar}>
          {categories.map((category, idx) => {
            return (
              <div key={`category${idx}`} onClick={() => handleCategoryClick(idx)}>
                <span>{category}</span>
                <span style={{ marginLeft: '0.5rem' }}>{clickedCategoryIndex === idx && `${page + 1} / ${listNewsData[idx]?.length || 0}`}</span>
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
                <span className={styles.media__news_time}>{currentPageNewsData.editedTime}</span>
                <button type="button" className={styles.media__news_subscribe_btn} aria-pressed="${pressedStatus}">
                  구독 버튼
                </button>
              </div>

              <div className={styles.media__news_datas}>
                <div className={styles.media__news__main}>
                  <a target="_blank" className={styles.media__news__main__link} href={currentPageNewsData.headline.href}>
                    <img src={currentPageNewsData.headline.thumbnailSrc} alt={currentPageNewsData.headline.title} />
                  </a>
                  <a target="_blank" className={styles.media__news__main__head_line} href={currentPageNewsData.headline.href}>
                    {currentPageNewsData.headline.title}
                  </a>
                </div>

                <ul className={styles.media__news__sub}>
                  {currentPageNewsData.sideNews.map(({ href, title }, idx) => (
                    <li key={idx}>
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
      <RightOutlined className={styles.angle_right} onClick={nextArrowClick} />
    </>
  );
}
