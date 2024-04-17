import styles from './HeadLine.module.scss';
import useNewsData from '../../hooks/useNewsdata';
import HeadLineBox from './HeadLineBox';

export default function HeadLine({ count }) {
    const [newsData, error] = useNewsData({ type: 'headline' });
    return (
        <section>
            <div className={styles.container}>
                {Array.from({ length: count }).map((_, idx) => (
                    <HeadLineBox key={idx} props={idx + 1} />
                ))}
            </div>
        </section>
    );
}
