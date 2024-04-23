import React, { createContext, useState } from 'react';

export const NewsContext = createContext();

export default function NewsProvider({ children, initGridRow, initGridcol, initGridMaxPage }) {
    const [gridRow, setGridRow] = useState(initGridRow);
    const [gridCol, setGridCol] = useState(initGridcol);
    const [gridMaxPage, setGridMaxPage] = useState(initGridMaxPage);

    return <NewsContext.Provider value={{ gridRow, gridCol, gridMaxPage, setGridRow, setGridCol, setGridMaxPage }}>{children}</NewsContext.Provider>;
}
