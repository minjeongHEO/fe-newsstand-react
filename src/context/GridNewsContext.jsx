import React, { createContext, useState } from 'react';

export const GridNewsContext = createContext();

export default function GridNewsProvider({ children, initGridRow, initGridcol, initGridMaxPage }) {
    const [gridRow, setGridRow] = useState(initGridRow);
    const [gridCol, setGridCol] = useState(initGridcol);
    const [gridMaxPage, setGridMaxPage] = useState(initGridMaxPage);

    return (
        <GridNewsContext.Provider value={{ gridRow, gridCol, gridMaxPage, setGridRow, setGridCol, setGridMaxPage }}>
            {children}
        </GridNewsContext.Provider>
    );
}
