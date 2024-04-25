import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import news from './News.module.scss';
import styles from './GridNews.module.scss';
import GridLine from './GridLine';
import { NewsContext } from '../../context/NewsContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { insertSubscribeData, selectAllSubscribeData, deleteSubscribeData } from '../../api/subscribeData';
import { fetchNewsData } from '../../api/fetchNewsData';

export default function GridNews({ gridNewsData, page, setPage, tabType, reSubscribedData }) {
    const { gridRow, gridCol, gridMaxPage, subscribes, setSubscribes, newsData, setNewsData } = useContext(NewsContext);

    const containerRef = useRef(null);
    const [subscribeHeight, setSubscribeHeight] = useState(0);

    const subscribedPressStyle = {
        height: tabType.subscribe === 'SUBSCRIBED_PRESS' ? `${subscribeHeight}px` : `100%`,
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCol}, 1fr)`,
        height: tabType.subscribe === 'SUBSCRIBED_PRESS' ? null : `100%`,
    };

    const prevArrowClick = () => setPage((prev) => ({ ...prev, grid: prev.grid - 1 }));
    const nextArrowClick = () => setPage((prev) => ({ ...prev, grid: prev.grid + 1 }));
    const isSubscribed = (pressNameToCheck) => !!subscribes.find(({ pressName }) => pressName === pressNameToCheck);

    const unSubscribe = async (idToDelete) => {
        const deleteResult = await deleteSubscribeData(idToDelete);
        if (deleteResult.result) {
            const newsData = await fetchNewsData({ type: 'news' });
            setNewsData(newsData);
            reSubscribedData();
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

    const setSubscribe = async ({ target }) => {
        const id = target.parentNode.id;
        const imgTarget = target.parentNode.children[0].children[0];
        const pressName = imgTarget.alt;
        const logoImageSrc = imgTarget.src;

        const subscribeObj = { id, pressName, logoImageSrc };

        //구독하기
        if (target.getAttribute('subscribe') === 'false') subscribe(subscribeObj);
        //해지하기
        if (target.getAttribute('subscribe') === 'true') unSubscribe(id);

        if (tabType.subscribe === 'SUBSCRIBED_PRESS') {
        }
    };

    useEffect(() => {
        const gridContainer = containerRef.current;
        if (!gridContainer) return;

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;
            const { blockSize: height } = entry.contentBoxSize[0];
            const heigthStyles = height / gridRow - 4;
            setSubscribeHeight(heigthStyles);
        });

        resizeObserver.observe(gridContainer);
        return () => resizeObserver.unobserve(gridContainer);
    }, []);

    return (
        <div ref={containerRef} className={styles.gridContainer}>
            <GridLine />

            <div className={styles.media__grid_type__container} style={gridStyle}>
                {gridNewsData[page].map((press) => (
                    <div key={press.id} id={press.id} style={subscribedPressStyle}>
                        <a href="#" className={styles['media__subscription-news-view']}>
                            <img src={press.logoImageSrc} alt={press.pressName} className={styles['media__grid_type__news_logo']}></img>
                        </a>
                        <button
                            className={styles['media__grid_type__subscribe_btn']}
                            onClick={setSubscribe}
                            subscribe={isSubscribed(press.pressName) ? 'true' : 'false'}
                        >
                            {isSubscribed(press.pressName) ? '😥해지하기' : ' 💙구독하기'}
                        </button>
                    </div>
                ))}
            </div>

            {page > 0 && <LeftOutlined className={news.angle_left} onClick={prevArrowClick} />}
            {page < gridMaxPage - 1 && gridNewsData.length > 1 && <RightOutlined className={news.angle_right} onClick={nextArrowClick} />}
        </div>
    );
}
