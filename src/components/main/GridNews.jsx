import React from 'react';
import styles from './GridNews.module.scss';
import GridLine from './GridLine';

export default function GridNews({ row, col, newsData, page }) {
    console.log('newsData[0]: ', newsData[0]);
    return (
        <div className={styles.gridContainer}>
            <GridLine row={row} col={col} />
            <div className={styles.media__grid_type__container}>
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
