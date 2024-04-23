import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import news from './News.module.scss';
import styles from './GridNews.module.scss';
import GridLine from './GridLine';
import { NewsContext } from '../../context/NewsContext';
import { useContext } from 'react';
import { insertSubscribeData, selectAllSubscribeData } from '../../api/subscribeData';

export default function GridNews({ newsData, page, setPage }) {
    const { gridCol, gridMaxPage, subscribes, setSubscribes } = useContext(NewsContext);

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCol}, 1fr)`,
        height: '100%',
    };

    const prevArrowClick = () => setPage((prev) => ({ ...prev, grid: prev.grid - 1 }));
    const nextArrowClick = () => setPage((prev) => ({ ...prev, grid: prev.grid + 1 }));

    const setSubscribe = async (e) => {
        const { target } = e;
        const imgTarget = target.parentNode.children[0].children[0];
        const pressName = imgTarget.alt;
        const logoImageSrc = imgTarget.src;

        const subscribeObj = { pressName, logoImageSrc };

        const insertResult = await insertSubscribeData(subscribeObj);
        if (insertResult.result) {
            const selectAllResult = await selectAllSubscribeData();
            if (selectAllResult.result) setSubscribes(selectAllResult.data);
        }
    };

    return (
        <div className={styles.gridContainer}>
            <GridLine />
            <div className={styles.media__grid_type__container} style={gridStyle}>
                {newsData[page].map((press) => (
                    <div key={press.id}>
                        <a href="#" className={styles['media__subscription-news-view']}>
                            <img src={press.logoImageSrc} alt={press.pressName} className={styles['media__grid_type__news_logo']}></img>
                        </a>
                        <button className={styles['media__grid_type__subscribe_btn']} onClick={setSubscribe}>
                            {subscribes.find(({ pressName }) => pressName === press.pressName) ? '- 해지하기' : '+ 구독하기'}
                        </button>
                    </div>
                ))}
            </div>

            {page > 0 && <LeftOutlined className={news.angle_left} onClick={prevArrowClick} />}
            {page < gridMaxPage - 1 && <RightOutlined className={news.angle_right} onClick={nextArrowClick} />}
        </div>
    );
}
