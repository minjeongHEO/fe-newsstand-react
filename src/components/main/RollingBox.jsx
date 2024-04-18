import { useEffect, useState } from 'react';
import styles from './HeadLineBox.module.scss';
import RollingText from './RollingText';

export default function RollingBox({ newsData, type }) {
    const [dataLength, setDataLength] = useState(0);

    useEffect(() => {
        if (newsData) setDataLength(newsData.length);
    }, [newsData]);

    return (
        <div className={styles.rolling_box}>
            {Array.from({ length: dataLength }).map((_, idx) => {
                return <RollingText key={idx} order={idx} type={type} newsData={newsData} />;
            })}
        </div>
    );
}
