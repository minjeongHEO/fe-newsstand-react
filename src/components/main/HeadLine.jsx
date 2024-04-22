import styles from './HeadLine.module.scss';
import useNewsData from '../../hooks/useNewsdata';
import HeadLineBox from './HeadLineBox';
import { useEffect, useState } from 'react';

export default function HeadLine({ gridCount }) {
    const [newsData, error] = useNewsData({ type: 'headline' });
    const [divideData, setDivideData] = useState([]);

    useEffect(() => {
        if (newsData && newsData.length > 0 && !error) {
            divideDataByGrid();
        }
    }, [newsData, error]);

    const divideDataByGrid = () => {
        const dataPerGrid = newsData.reduce(
            (acc, cur, idx) => {
                const elementPerGrid = Math.floor(newsData.length / gridCount);
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
