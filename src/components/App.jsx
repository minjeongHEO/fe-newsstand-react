import styles from './App.module.scss';
import Header from './header/Header';
import HeadLine from './main/HeadLine';
import News from './main/News';

function App() {
    return (
        <div id={styles.wrap}>
            <Header />
            <main>
                <HeadLine gridCount={2} />
                <News row={4} col={6} maxPage={4} />
            </main>
        </div>
    );
}

export default App;
