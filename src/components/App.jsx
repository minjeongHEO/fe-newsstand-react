import styles from './App.module.scss';
import Header from './header/Header';
import HeadLine from './main/HeadLine';
import News from './main/News';
import NewsProvider from '../context/NewsContext';

function App() {
    const [gridRow, gridCol, gridMaxPage] = [4, 6, 4];

    return (
        <div id={styles.wrap}>
            <Header />
            <main>
                <HeadLine gridCount={2} />
                <NewsProvider initGridRow={gridRow} initGridcol={gridCol} initGridMaxPage={gridMaxPage}>
                    <News />
                </NewsProvider>
            </main>
        </div>
    );
}

export default App;
