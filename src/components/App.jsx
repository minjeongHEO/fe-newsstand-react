import styles from './App.module.scss';
import Header from './header/Header';
import HeadLine from './main/HeadLine';
import News from './main/News';
import NewsProvider from '../context/NewsContext';

function App() {
    const [gridRow, gridCol, gridMaxPage, gridCount] = [4, 6, 4, 2];

    return (
        <div id={styles.wrap}>
            <Header />
            <main>
                <HeadLine gridCount={gridCount} />
                <NewsProvider initGridRow={gridRow} initGridcol={gridCol} initGridMaxPage={gridMaxPage}>
                    <News />
                </NewsProvider>
            </main>
        </div>
    );
}

export default App;
