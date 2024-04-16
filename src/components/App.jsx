import styles from "../css/components/App.module.scss";
import Header from "./header/Header";
import Section from "./section/Section";

function App() {
    return (
        <div id={styles.wrap}>
            <Header />
            <Section />
        </div>
    );
}

export default App;
