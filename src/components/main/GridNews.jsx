import React from 'react';
import styles from './GridNews.module.scss';
import GridLine from './GridLine';

export default function GridNews({ row, col }) {
    return (
        <>
            <GridLine row={row} col={col} />
        </>
    );
}
