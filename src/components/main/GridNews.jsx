import React from 'react';
import styles from './GridNews.module.scss';
import GridLine from './GridLine';

export default function GridNews({ row, col, newsData, page }) {
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
        </div>
    );
}
