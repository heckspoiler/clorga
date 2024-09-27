import React from 'react';

import styles from './page.module.css';

//component imports

import Header from './components/Header/Header';

export default function page() {
  return (
    <main className={styles.Main}>
      <Header />
      <div></div>
    </main>
  );
}
