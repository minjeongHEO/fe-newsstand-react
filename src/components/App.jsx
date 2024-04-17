import styles from '../css/components/App.module.scss';
import Header from './header/Header';
import HeadLine from './main/HeadLine';
import News from './main/News';

function App() {
    return (
        <div id={styles.wrap}>
            <Header />
            <main>
                <HeadLine />
                <News />
            </main>
        </div>
    );
}

export default App;
