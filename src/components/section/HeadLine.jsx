import styles from '../../css/components/section/HeadLine.module.scss';

export default function HeadLine({ children }) {
    return (
        <section className={styles.main__section__headline}>
            <div className={styles.headline__container}></div>
        </section>
    );
}
