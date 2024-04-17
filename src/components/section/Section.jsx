import { useEffect, useState } from 'react';
import HeadLine from './HeadLine';
import News from './News';

export default function Section() {
    const [newsdata, setNewsData] = useState({ headline: {}, press: {} });

    const fetchData = async () => {
        const headlineFilePath = 'data/headlineData.json';
        const pressFilePath = 'data/pressData.json';
        const headlineResponse = await fetch(headlineFilePath);
        const pressResponse = await fetch(pressFilePath);

        if (headlineResponse.ok !== true || pressResponse.ok !== true) return;

        const headlineData = await headlineResponse.json();
        const pressData = await pressResponse.json();

        setNewsData({ headline: headlineData, press: pressData });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main>
            <HeadLine data={newsdata.headline} />
            <News data={newsdata.press} />
        </main>
    );
}
