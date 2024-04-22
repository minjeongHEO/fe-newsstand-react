import { useContext, useEffect, useState } from 'react';
import styles from './News.module.scss';
import useNewsData from '../../hooks/useNewsdata';
import NavTab from './NavTab';
import GridNews from './GridNews';
import ListNews from './ListNews';
import { GridNewsContext } from '../../context/GridNewsContext';

export default function News() {
    const { gridRow, gridCol, gridMaxPage } = useContext(GridNewsContext);

    const [newsData, error] = useNewsData({ type: 'news' });
    const [tabType, setTabType] = useState({ subscribe: 'all', view: 'grid' });
    const [gridData, setGridData] = useState([]);
    const [page, setPage] = useState({ grid: 0, list: 0 });

    const changeTabType = {
        'all-press-tab': () => {
            setTabType((prev) => ({ ...prev, subscribe: 'all' }));
            setPage({ grid: 0, list: 0 });
        },
        'my-press-tab': () => {
            setTabType((prev) => ({ ...prev, subscribe: 'my' }));
            setPage({ grid: 0, list: 0 });
        },
        'list-view-tab': () => {
            setTabType((prev) => ({ ...prev, view: 'list' }));
            setPage({ grid: 0, list: 0 });
        },
        'grid-view-tab': () => {
            setTabType((prev) => ({ ...prev, view: 'grid' }));
            setPage({ grid: 0, list: 0 });
        },
    };

    const setOnClick = (e) => {
        const type = e.target.id;

        if (changeTabType[type]) changeTabType[type]();
    };

    const sliceData = (elementCount, data) => {
        let totalPage = Math.ceil(data.length / elementCount);
        return Array.from({ length: totalPage }, (_, idx) => data.slice(idx * elementCount, (idx + 1) * elementCount));
    };

    /**
     * @param {String} type - 데이터의 유형을 지정한다.
     *      "all" : 전체 데이터
     *      "my" : 사용자가 구독한 데이터
     */
    const getgridData = (type) => {
        const data = type === 'my' ? newsData.subscribe : newsData.news;

        if (data.length <= 0) return;

        const filterData = data.map((e) => {
            return { id: e.id, pressName: e.pressName, logoImageSrc: e.logoImageSrc };
        });
        const elementCount = gridRow * gridCol;
        const slicedData = sliceData(elementCount, filterData);
        const maxPageData = slicedData.slice(0, gridMaxPage);

        setGridData(maxPageData);
    };

    useEffect(() => {
        // 전체 언론사 && 그리드뷰(뷰타입state는 백로그)
        if (newsData && !error) {
            getgridData('all');
        }
    }, [newsData, error]);

    return (
        <div>
            <NavTab setOnClick={setOnClick} tabType={tabType} />
            <div className={styles.media__container}>
                {tabType.view === 'grid' && gridData[page.grid] ? <GridNews newsData={gridData} page={page.grid} setPage={setPage} /> : ''}
                {tabType.view === 'list' ? <ListNews /> : ''}
            </div>
        </div>
    );
}
