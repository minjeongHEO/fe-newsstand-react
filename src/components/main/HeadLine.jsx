import styles from '../../css/components/section/HeadLine.module.scss';
import useNewsData from '../../hooks/useNewsdata';

export default function HeadLine() {
    const [newsData, error] = useNewsData({ type: 'headline' });

    return (
        <section className={styles.main__section__headline}>
            <div className={styles.headline__container}></div>
        </section>
    );
}
