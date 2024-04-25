import { fetchNewsData } from '../../api/fetchNewsData';
import { useEffect, useState } from 'react';
import styles from './HeadLine.module.scss';
import HeadLineBox from './HeadLineBox';

export default function HeadLine({ gridCount }) {
    const [headLineData, setHeadLineData] = useState([]);
    const [divideData, setDivideData] = useState([]);

    const divideDataByGrid = () => {
        const dataPerGrid = headLineData.reduce(
            (acc, cur, idx) => {
                const elementPerGrid = Math.floor(headLineData.length / gridCount);
                const lastIndex = gridCount - 1;
                let sectionIdx = Math.floor(idx / elementPerGrid);

                if (sectionIdx > lastIndex) sectionIdx = lastIndex;

                if (acc[sectionIdx]) acc[sectionIdx].push(cur);
                return acc;
            },
            Array.from({ length: gridCount }, () => [])
        );
        setDivideData(dataPerGrid);
    };

    useEffect(() => {
        if (headLineData.length > 0) divideDataByGrid();
    }, [headLineData]);

    useEffect(() => {
        const initializeData = async () => {
            const data = await fetchNewsData({ type: 'headline' });
            setHeadLineData(data);
        };
        initializeData();
    }, []);

    return (
        <section>
            <div className={styles.container}>
                {divideData.length > 0
                    ? Array.from({ length: gridCount }).map((_, idx) => <HeadLineBox key={idx} section={idx} divideData={divideData} />)
                    : ''}
            </div>
        </section>
    );
}

HeadLine.__isStatic = true;
