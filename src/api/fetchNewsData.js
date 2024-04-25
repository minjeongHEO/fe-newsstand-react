/**
 * 크롤링 한 json 뉴스 데이터 fetch
 * @param {Object} - type:press(언론사), type:headline(뉴스 헤드라인)
 * @returns {Array} - [json데이터, error]
 */
export const fetchNewsData = async ({ type }) => {
    const filePath = import.meta.env.VITE_SERVER;
    try {
        const result = await fetch(`${filePath}/${type}.json`);
        const newsDatas = await result.json();
        return newsDatas;
    } catch (error) {
        console.error(`Fetch Error: ${error.message}`);
    }
};
