import { useEffect, useRef, useState } from 'react';
import styles from './GridLine.module.scss';

export default function GridLine({ row, col }) {
    const containerRef = useRef(null);
    const [lineStyles, setLineStyles] = useState({ rows: [], cols: [] });

    useEffect(() => {
        const gridLineContainer = containerRef.current;
        if (!gridLineContainer) return;

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;
            const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];

            const newRowStyles = Array.from({ length: row - 1 }).map((_, idx) => ({ top: `${(height / row) * (idx + 1) - 4}px` }));
            const newColStyles = Array.from({ length: col - 1 }).map((_, idx) => ({ left: `${(width / col) * (idx + 1)}px` }));
            setLineStyles({ rows: newRowStyles, cols: newColStyles });
        });

        resizeObserver.observe(gridLineContainer);

        return () => resizeObserver.unobserve(gridLineContainer);
    }, [row, col]);

    return (
        <div ref={containerRef} className={styles['gridLine_Container']}>
            {lineStyles.rows.map((eachStyle, idx) => (
                <i key={`row-${idx}`} className={`${styles['gridLine']} ${styles['gridLine_row']}`} style={eachStyle}></i>
            ))}
            {lineStyles.cols.map((eachStyle, idx) => (
                <i key={`col-${idx}`} className={`${styles['gridLine']} ${styles['gridLine_col']}`} style={eachStyle}></i>
            ))}
        </div>
    );
}
