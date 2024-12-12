import { useContext, useEffect, useState } from 'react';
import styles from './News.module.scss';
import NavTab from './NavTab';
import GridNews from './GridNews';
import ListNews from './ListNews';
import { NewsContext } from '../../context/NewsContext';
import { selectAllSubscribeData } from '../../api/subscribeData';
import { fetchNewsData } from '../../api/fetchNewsData';

export default function News() {
  const { gridRow, gridCol, gridMaxPage, subscribes, setSubscribes, newsData, setNewsData } = useContext(NewsContext);
  const [tabType, setTabType] = useState({ subscribe: 'ALL_PRESS', view: 'GRID_VIEW_TYPE' });

  const [dataByViewType, setDataByViewType] = useState({ grid: [], list: [] });
  const [page, setPage] = useState({ grid: 0, list: 0 });
  const [clickedCategoryIndex, setClickedCategoryIndex] = useState(0);

  const changeTabType = {
    'all-press-tab': () => {
      setTabType((prev) => ({ ...prev, subscribe: 'ALL_PRESS' }));
      setPage({ grid: 0, list: 0 });
    },
    'my-press-tab': () => {
      setTabType((prev) => ({ ...prev, subscribe: 'SUBSCRIBED_PRESS' }));
      setPage({ grid: 0, list: 0 });
    },
    'list-view-tab': () => {
      setTabType((prev) => ({ ...prev, view: 'LIST_VIEW_TYPE' }));
      setPage({ grid: 0, list: 0 });
    },
    'grid-view-tab': () => {
      setTabType((prev) => ({ ...prev, view: 'GRID_VIEW_TYPE' }));
      setPage({ grid: 0, list: 0 });
    },
  };

  const setOnClick = (e) => {
    setClickedCategoryIndex(0);
    const element = e.target.closest('[data-view-type]');
    if (!element) return;
    const type = element.dataset.viewType;

    if (type && changeTabType[type]) changeTabType[type]();
  };

  const sliceData = (elementCount, data) => {
    let totalPage = Math.ceil(data.length / elementCount);
    return Array.from({ length: totalPage }, (_, idx) => data.slice(idx * elementCount, (idx + 1) * elementCount));
  };

  /**
   * @param {String} type - 리스트 타입 데이터의 유형을 지정한다.
   *      "ALL_PRESS" : 전체 데이터
   *      "SUBSCRIBED_PRESS" : 사용자가 구독한 데이터
   */
  const getListData = (type) => {
    const data = type === 'SUBSCRIBED_PRESS' ? newsData.subscribe : newsData.news;

    if (!data) return;
    if (data && !data.length) {
      setDataByViewType((prev) => ({ ...prev, list: [] }));
      return;
    }
  };
  /**
   * @param {String} type - 그리드 타입 데이터의 유형을 지정한다.
   *      "ALL_PRESS" : 전체 데이터
   *      "SUBSCRIBED_PRESS" : 사용자가 구독한 데이터
   */
  const getGridData = (type) => {
    const data = type === 'SUBSCRIBED_PRESS' ? newsData.subscribe : newsData.news;

    if (!data) return;
    if (data && !data.length) {
      setDataByViewType((prev) => ({ ...prev, grid: [] }));
      return;
    }

    const filterData = data.map((e) => ({ id: e.id, pressName: e.pressName, logoImageSrc: e.logoImageSrc }));
    const elementCount = gridRow * gridCol;
    const slicedData = sliceData(elementCount, filterData);
    const maxPageData = slicedData.slice(0, gridMaxPage);

    setDataByViewType((prev) => ({ ...prev, grid: maxPageData }));
  };

  const initializeSubscribedData = async () => {
    const selectAllResult = await selectAllSubscribeData();
    if (selectAllResult.result) setSubscribes(selectAllResult.data);
  };

  const initializeDataByType = () => {
    if (newsData) {
      if (tabType.view === 'GRID_VIEW_TYPE' && tabType.subscribe === 'ALL_PRESS') getGridData('ALL_PRESS');
      if (tabType.view === 'GRID_VIEW_TYPE' && tabType.subscribe === 'SUBSCRIBED_PRESS') getGridData('SUBSCRIBED_PRESS');
      if (tabType.view === 'LIST_VIEW_TYPE' && tabType.subscribe === 'ALL_PRESS') getListData('ALL_PRESS');
      if (tabType.view === 'LIST_VIEW_TYPE' && tabType.subscribe === 'SUBSCRIBED_PRESS') getListData('SUBSCRIBED_PRESS');
    }
  };

  useEffect(() => {
    if (newsData) {
      initializeSubscribedData();
      setNewsData(newsData);
      initializeDataByType();
    }
  }, [newsData]);

  useEffect(() => {
    const initializeData = async () => {
      const newsData = await fetchNewsData({ type: 'news' });
      setNewsData(newsData);
    };

    initializeData(); // news.json
  }, [tabType]);

  return (
    <div>
      <NavTab setOnClick={setOnClick} tabType={tabType} />
      <div className={styles.media__container}>
        {tabType.view === 'GRID_VIEW_TYPE' && <GridNews gridNewsData={dataByViewType.grid} page={page.grid} setPage={setPage} tabType={tabType} />}
        {tabType.view === 'LIST_VIEW_TYPE' && <ListNews {...{ newsData, tabType, clickedCategoryIndex, setClickedCategoryIndex }} />}
      </div>
    </div>
  );
}
