import React, { useEffect, useState } from 'react';

/**
 * 크롤링 한 json 뉴스 데이터 fetch
 * @param {Object} - type:press(언론사), type:headline(뉴스 헤드라인)
 * @returns {Array} - [json데이터, error]
 */
export default function useNewsData({ type }) {
    const [error, setError] = useState('');
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        setError(undefined);
        let name = '';
        if (type === 'headline') name = 'headlineData';
        if (type === 'press') name = 'pressData';
        const filePath = `data/${name}.json`;

        fetch(filePath)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP Error, status:${res.status}`);
                return res.json();
            })
            .then((data) => setNewsData(data))
            .catch((e) => setError(`Fetch Error: ${e.message}`));
    }, []);

    return [newsData, error];
}
