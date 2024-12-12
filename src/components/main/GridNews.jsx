import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import news from './News.module.scss';
import styles from './GridNews.module.scss';
import GridLine from './GridLine';
import { NewsContext } from '../../context/NewsContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { insertSubscribeData, selectAllSubscribeData, deleteSubscribeData } from '../../api/subscribeData';
import { fetchNewsData } from '../../api/fetchNewsData';

export default function GridNews({ gridNewsData, page, setPage, tabType }) {
  const { gridRow, gridCol, gridMaxPage, subscribes, setSubscribes, newsData, setNewsData } = useContext(NewsContext);

  const containerRef = useRef(null);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridCol}, 1fr)`,
    gridTemplateRows: `repeat(${gridRow}, 1fr)`,
    width: '100%',
    height: '100%',
  };

  const prevArrowClick = () => setPage((prev) => ({ ...prev, grid: prev.grid - 1 }));
  const nextArrowClick = () => setPage((prev) => ({ ...prev, grid: prev.grid + 1 }));
  const isSubscribed = (newsId) => !!subscribes.find(({ id }) => id === newsId);

  const unSubscribe = async (idToDelete) => {
    const deleteResult = await deleteSubscribeData(idToDelete);

    if (deleteResult.result) {
      const data = await fetchNewsData({ type: 'news' });

      setNewsData(data);
    }
  };

  const subscribe = async (subscribeObj) => {
    const insertResult = await insertSubscribeData(subscribeObj);
    const newNewsData = await fetchNewsData({ type: 'news' });
    setNewsData(newNewsData);

    if (insertResult.result) {
      const selectAllResult = await selectAllSubscribeData();
      if (selectAllResult.result) setSubscribes(selectAllResult.data);
    }
  };

  const filterNewsData = (targetNewsID) => {
    return newsData.news.filter(({ id }) => id === targetNewsID)[0];
  };

  const handleSubscribe = async ({ target }) => {
    const id = target.parentNode.id;
    const subscribeObj = filterNewsData(id);

    //구독하기
    if (target.getAttribute('subscribe') === 'false') {
      subscribe(subscribeObj);
    }
    //해지하기
    if (target.getAttribute('subscribe') === 'true') {
      unSubscribe(id);
    }
    if (tabType.subscribe === 'SUBSCRIBED_PRESS') {
    }
  };

  return (
    <div ref={containerRef} className={styles.gridContainer}>
      <GridLine />
      {Array.isArray(gridNewsData) && gridNewsData.length > 0 && gridNewsData[page] ? (
        <div className={styles.media__grid_type__container} style={gridStyle}>
          {gridNewsData[page].map(({ id, logoImageSrc, pressName }) => (
            <div key={id} id={id}>
              <a href="#" className={styles['media__subscription-news-view']}>
                <img src={logoImageSrc} alt={pressName} className={styles['media__grid_type__news_logo']}></img>
              </a>
              <button className={styles['media__grid_type__subscribe_btn']} onClick={handleSubscribe} subscribe={isSubscribed(id) ? 'true' : 'false'}>
                {isSubscribed(id) ? '😥 해지하기' : ' 💙 구독하기'}
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {page > 0 && <LeftOutlined className={news.angle_left} onClick={prevArrowClick} />}
      {page < gridMaxPage - 1 && gridNewsData.length > 1 && <RightOutlined className={news.angle_right} onClick={nextArrowClick} />}
    </div>
  );
}
