import { useState } from 'react';
import styles from './HeadLineBox.module.scss';

export default function RollingText({ order, type, newsData }) {
    let classNameByOrder = '';
    if (order === 0) classNameByOrder = 'pre_text';
    if (order === 1) classNameByOrder = 'cur_text';
    if (order === 2) classNameByOrder = 'next_text';
    if (order === 3) return;
    if (order === 4) return;

    return (
        <div className={styles[classNameByOrder]}>
            <a href={type === 'press' ? newsData[order].newsLink : newsData[order].contentsLink} target="_blank">
                {type === 'press' ? newsData[order].newsName : newsData[order].contentsHeader}
            </a>
        </div>
    );
}
