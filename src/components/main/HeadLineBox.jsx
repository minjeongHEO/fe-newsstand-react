import styles from './HeadLineBox.module.scss';
import RollingBox from './RollingBox';

export default function HeadLineBox({ section, divideData }) {
    return (
        <div className={`${styles.contents} ${styles.section}${section}`}>
            <div className={styles.press_name}>
                <RollingBox newsData={divideData[section]} type="press" />
            </div>
            <div className={styles.news}>
                <RollingBox newsData={divideData[section]} type="news" />
            </div>
        </div>
    );
}
