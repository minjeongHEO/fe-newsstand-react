import React from 'react';
import useNewsData from '../../hooks/useNewsdata';

export default function News() {
    const [newsData, error] = useNewsData({ type: 'press' });

    return <div></div>;
}
