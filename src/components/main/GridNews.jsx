import news from './News.module.scss';
import styles from './GridNews.module.scss';
import GridLine from './GridLine';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { GridNewsContext } from '../../context/GridNewsContext';

export default function GridNews({ newsData, page, setPage }) {
    const { gridRow, gridCol, gridMaxPage } = useContext(GridNewsContext);

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCol}, 1fr)`,
        height: '100%',
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
                    </div>
                ))}
            </div>
            {page > 0 && (
                <LeftOutlined className={news.angle_left} id="grid-left-btn" onClick={() => setPage((prev) => ({ ...prev, grid: prev.grid - 1 }))} />
            )}
            {page < gridMaxPage - 1 && (
                <RightOutlined
                    className={news.angle_right}
                    id="grid-right-btn"
                    onClick={() => setPage((prev) => ({ ...prev, grid: prev.grid + 1 }))}
                />
            )}
        </div>
    );
}
