import React, { useEffect, useState } from 'react';

/**
 * 크롤링 한 json 뉴스 데이터 fetch
 * @param {Object} - type:press(언론사), type:headline(뉴스 헤드라인)
 * @returns {Array} - [json데이터, error]
 */
export default function useNewsData({ type }) {
    const [error, setError] = useState();
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        setError(undefined);
        let name = '';
        if (type === 'headline') name = 'headlineData';
        if (type === 'news') name = 'news';
        const filePath = `data/${name}.json`;

        const fetchData = async () => {
            try {
                const result = await fetch(filePath);
                if (!result.ok) throw new Error(`HTTP Error, status:${result.status}`);
                const newsData = await result.json();
                setNewsData(newsData);
            } catch (error) {
                setError(`Fetch Error: ${error.message}`);
            }
        };

        fetchData();
    }, [type]);

    return [newsData, error];
}
