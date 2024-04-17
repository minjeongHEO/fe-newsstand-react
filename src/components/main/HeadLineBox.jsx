import useNewsData from '../../hooks/useNewsdata';
import styles from './HeadLineBox.module.scss';
import RollingText from './RollingText';

//test
export default function HeadLineBox({ props }) {
    //fetch
    const [data, error] = useNewsData({ type: 'headline' });

    return (
        <div className={`${styles.contents} ${styles.section}${props}`}>
            <div className={styles.press_name}>
                <RollingText newsData={data} type="press" />
            </div>
            <div className={styles.news}>
                <RollingText newsData={data} type="news" />
            </div>
        </div>
    );
}
