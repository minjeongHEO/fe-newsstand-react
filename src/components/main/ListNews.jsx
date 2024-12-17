import React, { useContext, useEffect, useState } from 'react';
import styles from './ListNews.module.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { NewsContext } from '../../context/NewsContext';
import { deleteSubscribeData, insertSubscribeData, selectAllSubscribeData } from '../../api/subscribeData';
import { fetchNewsData } from '../../api/fetchNewsData';

export default function ListNews({
  listNewsData,
  tabType,
  setTabType,
  setDataByViewType,
  clickedCategoryIndex,
  setClickedCategoryIndex,
  page,
  setPage,
  changeTabType,
}) {
  const { newsData, setNewsData } = useContext(NewsContext);

  const [categories, setCategories] = useState([]);
  const [listNewsByCategory, setListNewsByCategory] = useState(null);
  const [currentPageNewsData, setCurrentPageNewsData] = useState(null);

  const extractNewsByCategory = (newsData) => {
    const initialArray = Array.from({ length: categories.length }, () => []);
    return newsData.reduce((acc, cur) => {
      const index = categories.indexOf(cur.category);
      if (index !== -1) acc[index].push(cur);
      return acc;
    }, initialArray);
  };

  const extractCategories = (newsData) => (newsData ? [...new Set(newsData.map(({ category }) => category))] : []);

  const filterNewsByCategories = (newsItems, categories) => {
    return newsItems && newsItems.filter(({ category }) => categories.includes(category));
  };

  const extractSubscribeCategory = () => {
    const subscribedCategories = extractCategories(listNewsData);
    const filteredNews = filterNewsByCategories(newsData.news, subscribedCategories);
    if (!filteredNews) return;
    const filteredCategories = extractCategories(filteredNews);
    setCategories(filteredCategories);
  };

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
    const maxPage = listNewsByCategory[clickedCategoryIndex].length;
    if (page + 1 === maxPage) {
      setClickedCategoryIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
      setPage((prev) => ({ ...prev, list: 0 }));
      return;
    }

    setPage((prev) => ({ ...prev, list: prev.list + 1 }));
  };

  /** 구독 해지하기 */
  const unSubscribe = async (idToDelete) => {
    const deleteResult = await deleteSubscribeData(idToDelete);
    if (deleteResult.result) {
      const selectAllResult = await selectAllSubscribeData();
      if (selectAllResult.result) {
        setDataByViewType((prev) => ({ ...prev, list: selectAllResult.data }));
        // 카테고리인덱스랑 페이지도 바꿔야함
        // changeTabType['all-press-tab']();
      }
    }
  };

  /** 구독하기 */
  const subscribe = async (subscribeObj) => {
    const insertResult = await insertSubscribeData(subscribeObj);
    const newNewsData = await fetchNewsData({ type: 'news' });

    setNewsData(newNewsData.news);

    if (insertResult.result) {
      const selectAllResult = await selectAllSubscribeData();
      if (selectAllResult.result) setDataByViewType((prev) => ({ ...prev, list: selectAllResult.data }));

      setTabType((prev) => ({ ...prev, subscribe: 'SUBSCRIBED_PRESS' }));
      setClickedCategoryIndex(0);
      setPage((prev) => ({ ...prev, list: 0 }));
      extractSubscribeCategory();
    }
  };

  const handleSubscribe = (currentPageNewsData, isSubscribed) => {
    //구독하기
    if (!isSubscribed) {
      subscribe(currentPageNewsData);
      return;
    }
    //해지하기
    if (isSubscribed) unSubscribe(currentPageNewsData.id);
  };

  const isSubscribed = (newsId, subscribe) => subscribe && !!subscribe.find(({ id }) => id === newsId);

  // const actionAfterSubscriptions = (target, tabType) => {
  //   switch (TAB_TYPE) {
  //     case 'grid':
  //       break;

  //     case 'list':
  //       target.innerText = 'x';
  //       target.setAttribute('aria-pressed', 'true');

  //       const snackbarTarget = document.querySelector('#media__subscribe_snackbar');
  //       snackbarTarget.classList.add('snackbar-animation');

  //       setTimeout(() => {
  //         snackbarTarget.classList.remove('snackbar-animation');
  //       }, 5000);

  //       // 내가 구독한 탭바로 이동하기
  //       document.querySelector('#my-press-tab').click();
  //       break;

  //     default:
  //       break;
  //   }
  // };

  useEffect(() => {
    if (tabType.subscribe === 'ALL_PRESS') {
      setCategories(extractCategories(listNewsData));
      return;
    }

    if (tabType.subscribe === 'SUBSCRIBED_PRESS') {
      extractSubscribeCategory();
      return;
    }
  }, [listNewsData]);

  useEffect(() => {
    setListNewsByCategory(extractNewsByCategory(listNewsData));
  }, [listNewsData]);

  useEffect(() => {
    if (!listNewsByCategory || !listNewsByCategory[clickedCategoryIndex]) return;
    setCurrentPageNewsData(listNewsByCategory[clickedCategoryIndex][page]);
  }, [tabType.subscribe, listNewsByCategory, clickedCategoryIndex, page]);

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
                  <span style={{ marginLeft: '0.5rem' }}>
                    {clickedCategoryIndex === idx && `${page + 1} / ${listNewsByCategory[idx]?.length || 0}`}
                  </span>
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
