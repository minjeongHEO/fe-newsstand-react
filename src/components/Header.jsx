import React from 'react';
import Logo from './Logo';
import Date from './Date';
import styles from '../css/components/Header.module.css';

export default function Header() {
  return (
    <header className={styles.container}>
      <Logo />
      <Date />
    </header>
  );
}
