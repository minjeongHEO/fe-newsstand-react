import { useEffect, useState } from 'react';
import styles from './HeadLineBox.module.scss';

export default function HeadLineBox({ section, divideData }) {
    const dataLength = divideData[section].length;
    const animationDuration = 3000; // 애니메이션 지속 시간 (3초)
    const [order, setOrder] = useState([0, 1, 2]);
    const [toggleAni, setToggleAni] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setOrder((currentOrder) => currentOrder.map((index) => (index + 1) % dataLength));
            setToggleAni((curAni) => !curAni);
        }, animationDuration);

        return () => clearInterval(interval);
    }, [dataLength, divideData.length]);

    return (
        <div className={`${styles.contents} ${styles.section}${section}`}>
            {order.map((contentIndex, idx) => {
                const content = divideData[section][contentIndex];
                if (!content) return;
                return (
                    <div
                        key={`${section}-${idx}`}
                        className={`${styles.rolling_box} ${toggleAni ? styles.text_move_up_paused : styles.text_move_up}`}
                    >
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
HeadLineBox.__isStatic = true;
