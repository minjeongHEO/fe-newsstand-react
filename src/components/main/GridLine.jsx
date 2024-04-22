import { useEffect, useRef, useState, useContext } from 'react';
import styles from './GridLine.module.scss';
import { GridNewsContext } from '../../context/GridNewsContext';

export default function GridLine() {
    const { gridRow, gridCol, maxPage } = useContext(GridNewsContext);

    const containerRef = useRef(null);
    const [lineStyles, setLineStyles] = useState({ rows: [], cols: [] });

    useEffect(() => {
        const gridLineContainer = containerRef.current;
        if (!gridLineContainer) return;

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;
            const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];

            const newRowStyles = Array.from({ length: gridRow - 1 }).map((_, idx) => ({ top: `${(height / gridRow) * (idx + 1) - 4}px` }));
            const newColStyles = Array.from({ length: gridCol - 1 }).map((_, idx) => ({ left: `${(width / gridCol) * (idx + 1)}px` }));
            setLineStyles({ rows: newRowStyles, cols: newColStyles });
        });

        resizeObserver.observe(gridLineContainer);

        return () => resizeObserver.unobserve(gridLineContainer);
    }, [gridRow, gridCol]);

    return (
        <div ref={containerRef} className={styles['gridLine_Container']}>
            {lineStyles.rows.map((eachStyle, idx) => (
                <i key={`gridRow-${idx}`} className={`${styles['gridLine']} ${styles['gridLine_row']}`} style={eachStyle}></i>
            ))}
            {lineStyles.cols.map((eachStyle, idx) => (
                <i key={`gridCol-${idx}`} className={`${styles['gridLine']} ${styles['gridLine_col']}`} style={eachStyle}></i>
            ))}
        </div>
    );
}
