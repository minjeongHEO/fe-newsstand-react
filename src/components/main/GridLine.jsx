import styles from './GridLine.module.scss';

export default function GridLine({ row, col }) {
    return (
        <>
            {Array.from({ length: row - 1 }).map(() => (
                <i className={styles.gridLine_row}></i>
            ))}
            {Array.from({ length: col - 1 }).map(() => (
                <i className={styles.gridLine_col}></i>
            ))}
        </>
    );
}
