import { useState } from 'react';
import styles from './HeadLineBox.module.scss';

export default function RollingText({ newsData, type }) {
    const [press, setPress] = useState({ link: [], name: [] });
    const [contents, setContents] = useState({ link: [], contents: [] });

    // if (type === 'press') {
    //     newsData[0].contentsLink;
    //     newsData[0].contentsHeader;
    // }
    // if (type === 'news') {
    //     newsData[0].newsLink;
    //     newsData[0].newsName;
    // }
    return (
        <div className={styles.rolling_box}>
            <div className={styles.pre_text}>
                <a href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y" target="_blank">
                    연합뉴스
                </a>
            </div>
            <div className={styles.cur_text}>
                <a href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y" target="_blank">
                    연합뉴스
                </a>
            </div>
            <div className={styles.next_text}>
                <a href="https://news.naver.com/main/list.naver?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y" target="_blank">
                    연합뉴스
                </a>
            </div>
        </div>
    );
}
