import news from './News.module.scss';
import styles from './GridNews.module.scss';
import GridLine from './GridLine';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

export default function GridNews({ row, col, newsData, page, maxPage, setGridPage }) {
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${col}, 1fr)`,
        height: '100%',
    };

    return (
        <div className={styles.gridContainer}>
            <GridLine row={row} col={col} />
            <div className={styles.media__grid_type__container} style={gridStyle}>
                {newsData[page].map((press) => (
                    <div key={press.id}>
                        <a href="#" className={styles['media__subscription-news-view']}>
                            <img src={press.logoImageSrc} alt={press.pressName} className={styles['media__grid_type__news_logo']}></img>
                        </a>
                    </div>
                ))}
            </div>

            {page > 0 && <LeftOutlined className={news.angle_left} id="grid-left-btn" onClick={() => setGridPage((prev) => prev - 1)} />}
            {page < maxPage - 1 && <RightOutlined className={news.angle_right} id="grid-right-btn" onClick={() => setGridPage((prev) => prev + 1)} />}
        </div>
    );
}
