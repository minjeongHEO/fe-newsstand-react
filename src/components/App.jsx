import styles from './App.module.scss';
import Header from './header/Header';
import HeadLine from './main/HeadLine';
import News from './main/News';
import NewsProvider from '../context/NewsContext';
import { GRID_ROW, GRID_COL, GRID_MAX_PAGE, GRID_COUNT } from '../constants/grid';

function App() {
  return (
    <div id={styles.wrap}>
      <Header />
      <main>
        <HeadLine gridCount={GRID_COUNT} />
        <NewsProvider initGridRow={GRID_ROW} initGridcol={GRID_COL} initGridMaxPage={GRID_MAX_PAGE}>
          <News />
        </NewsProvider>
      </main>
    </div>
  );
}

export default App;
