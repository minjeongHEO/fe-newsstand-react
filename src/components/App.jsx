import styles from '../css/components/App.module.scss';
import Header from './Header';
import Section from './Section';

function App() {
    return (
        <div id={styles.wrap}>
            <Header />
            <Section />
        </div>
    );
}

export default App;
