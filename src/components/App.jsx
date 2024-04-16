import { useState } from 'react';
import styles from '../css/components/App.module.css';
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
