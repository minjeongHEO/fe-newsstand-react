import { useEffect, useState } from 'react';
import styles from './HeadLineBox.module.scss';
import RollingBox from './RollingBox';

export default function HeadLineBox({ section, divideData }) {
    if (divideData.length === 0) return;

    const dataLength = divideData[0].length;
    const animationDuration = 3000; // 애니메이션 지속 시간 (3초)
    const [order, setOrder] = useState([0, 1, 2]);
    const [pauseAni, setPauseAni] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrder((currentOrder) => currentOrder.map((index) => (index + 1) % dataLength));
        }, animationDuration);

        setPauseAni((curAni) => !curAni);
        return () => clearInterval(interval);
    }, [dataLength]);

    return (
        <div className={`${styles.contents} ${styles.section}${section}`}>
            {/* {Array.from({ length: order.length }).map((_, idx) => { */}
            {order.map((contentIndex, idx) => {
                const content = divideData[section][contentIndex];
                return (
                    <div key={idx} className={`${styles.rolling_box} ${styles.text_move_up} ${pauseAni ? styles.text_move_up_paused : ''}`}>
                        <div className={styles.press_name}>
                            <a href={content.newsLink} target="_blank">
                                {content.newsName}
                            </a>
                        </div>
                        <div className={styles.news}>
                            <a href={content.contentsLink} target="_blank">
                                {content.contentsHeader}
                            </a>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
