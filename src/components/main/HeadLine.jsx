import styles from './HeadLine.module.scss';
import useNewsData from '../../hooks/useNewsdata';
import LineNews from './LineNews';

export default function HeadLine({ count }) {
    const [newsData, error] = useNewsData({ type: 'headline' });
    return (
        <section className={styles.main__section__headline}>
            <div className={styles.headline__container}>
                {Array.from({ length: count }).map((_, idx) => (
                    <LineNews key={idx} props={idx + 1} />
                ))}
            </div>
        </section>
    );
}
