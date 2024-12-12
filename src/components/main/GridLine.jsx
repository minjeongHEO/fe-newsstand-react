import { useEffect, useRef, useState, useContext } from 'react';
import styles from './GridLine.module.scss';
import { NewsContext } from '../../context/NewsContext';

export default function GridLine() {
  const { gridRow, gridCol } = useContext(NewsContext);

  const containerRef = useRef(null);
  const [lineStyles, setLineStyles] = useState({ rows: [], cols: [] });

  useEffect(() => {
    const gridLineContainer = containerRef.current;
    if (!gridLineContainer) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const newRowStyles = Array.from({ length: gridRow - 1 }).map((_, idx) => ({ top: `${((idx + 1) / gridRow) * 100}%` }));
      const newColStyles = Array.from({ length: gridCol - 1 }).map((_, idx) => ({ left: `${((idx + 1) / gridCol) * 100}%` }));
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
