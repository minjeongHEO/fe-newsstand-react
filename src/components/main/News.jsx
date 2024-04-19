import React, { useEffect, useState } from 'react';
import useNewsData from '../../hooks/useNewsdata';

export default function News() {
    const [newsData, error] = useNewsData({ type: 'news' });
    const [gridData, setGridData] = useState([]);

    useEffect(() => {
        // 전체 언론사 && 그리드뷰(뷰타입state는 백로그)
        if (newsData && !error) {
            getgridData('all');
        }
    }, [newsData, error]);

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

        setGridData(filterData);

        // 최대 24개 * 4페이지  = 96개
    };

    return <div>뉴스</div>;
}
