import React, { useContext, useEffect, useState } from 'react';
import styles from './ListNews.module.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { NewsContext } from '../../context/NewsContext';
import { insertSubscribeData, selectAllSubscribeData } from '../../api/subscribeData';
import { fetchNewsData } from '../../api/fetchNewsData';

export default function ListNews({ tabType, setTabType, clickedCategoryIndex, setClickedCategoryIndex, page, setPage }) {
  const { setSubscribes, newsData, setNewsData } = useContext(NewsContext);

  const [categories, setCategories] = useState([]);
  const [listNewsData, setListNewsData] = useState(null);
  const [currentPageNewsData, setCurrentPageNewsData] = useState(null);

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

  const extractCategories = (newsData) => (newsData ? [...new Set(newsData.map(({ category }) => category))] : []);

  const getCurrentNewsData = (subscribeType) => NEWS_DATA_MAP[subscribeType] || [];

  const filterNewsByCategories = (newsItems, categories) => {
    return newsItems && newsItems.filter(({ category }) => categories.includes(category));
  };

  useEffect(() => {
    // const currentNewsData = getCurrentNewsData(tabType.subscribe);

    if (tabType.subscribe === 'ALL_PRESS') {
      setCategories(extractCategories(newsData.news));
      return;
    }

    if (tabType.subscribe === 'SUBSCRIBED_PRESS') {
      const subscribedCategories = extractCategories(newsData.subscribe);
      const filteredNews = filterNewsByCategories(newsData.news, subscribedCategories);
      if (!filteredNews) return;
      const filteredCategories = extractCategories(filteredNews);
      setCategories(filteredCategories);
      return;
    }
  }, [newsData, newsData.news, tabType.subscribe]);

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
    setPage((prev) => ({ ...prev, list: 0 }));
  };

  const prevArrowClick = () => {
    if (!page) {
      setClickedCategoryIndex((prevIndex) => (!prevIndex ? categories.length - 1 : prevIndex - 1));
      setPage((prev) => ({ ...prev, list: 0 }));
      return;
    }

    setPage((prev) => ({ ...prev, list: prev.list - 1 }));
  };

  const nextArrowClick = () => {
    const maxPage = listNewsData[clickedCategoryIndex].length;
    if (page + 1 === maxPage) {
      setClickedCategoryIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
      setPage((prev) => ({ ...prev, list: 0 }));
      return;
    }

    setPage((prev) => ({ ...prev, list: prev.list + 1 }));
  };

  /** 구독 해지하기 */
  const unSubscribe = async (idToDelete) => {
    // const deleteResult = await deleteSubscribeData(idToDelete);
    // if (deleteResult.result) {
    //   const data = await fetchNewsData({ type: 'news' });
    //   setNewsData(data);
    // }
  };

  /** 구독하기 */
  const subscribe = async (subscribeObj) => {
    console.log(subscribeObj);
    const insertResult = await insertSubscribeData(subscribeObj);
    const newNewsData = await fetchNewsData({ type: 'news' });

    setNewsData(newNewsData.news);

    if (insertResult.result) {
      const selectAllResult = await selectAllSubscribeData();
      if (selectAllResult.result) setSubscribes(selectAllResult.data);

      setTabType((prev) => ({ ...prev, subscribe: 'SUBSCRIBED_PRESS' }));
      setClickedCategoryIndex(0);
      setPage((prev) => ({ ...prev, list: 0 }));
    }
  };

  const handleSubscribe = (currentPageNewsData, isSubscribed) => {
    //구독하기
    if (!isSubscribed) {
      subscribe(currentPageNewsData);
      return;
    }
    //해지하기
    if (isSubscribed) {
      unSubscribe(currentPageNewsData.id);
    }
    // if (tabType.subscribe === 'SUBSCRIBED_PRESS') {
    // }
  };

  const isSubscribed = (newsId, subscribe) => subscribe && !!subscribe.find(({ id }) => id === newsId);

  return (
    <>
      <LeftOutlined className={styles.angle_left} onClick={prevArrowClick} />

      <div>
        {/* 리스트 카테고리 바 */}
        <div className={styles.media__category_bar}>
          {categories &&
            categories.length > 0 &&
            categories.map((category, idx) => {
              return (
                <div key={`category${idx}`} onClick={() => handleCategoryClick(idx)}>
                  <span>{category}</span>
                  <span style={{ marginLeft: '0.5rem' }}>{clickedCategoryIndex === idx && `${page + 1} / ${listNewsData[idx]?.length || 0}`}</span>
                </div>
              );
            })}
        </div>

        {/* 리스트 카테고리 뉴스 */}
        <div className={styles.media__news_container}>
          {currentPageNewsData && (
            <>
              <div className={styles.media__news_logo}>
                <a href="#">
                  <img src={currentPageNewsData.logoImageSrc} height="20" width="auto" alt={currentPageNewsData.pressName} />
                </a>
                <span className={styles.media__news_time}>{currentPageNewsData.editedTime}</span>
                <button
                  type="button"
                  className={styles.media__news_subscribe_btn}
                  onClick={() => handleSubscribe(currentPageNewsData, isSubscribed(currentPageNewsData.id, newsData.subscribe))}
                >
                  {isSubscribed(currentPageNewsData.id, newsData.subscribe) ? '😥 해지하기' : ' 💙 구독하기'}
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
            </>
          )}
        </div>
      </div>
      <RightOutlined className={styles.angle_right} onClick={nextArrowClick} />
    </>
  );
}
