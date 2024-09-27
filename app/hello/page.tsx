import React from 'react';

import styles from './page.module.css';

//component imports

import Header from './components/Header/Header';
import FirstSection from './components/FirstSection/FirstSection';
import SecondSection from './components/SecondSection/SecondSection';

export default function page() {
  return (
    <main className={styles.Main}>
      <Header />
      <section className={styles.SectionContainer}>
        <FirstSection />
      </section>
      <section className={styles.SectionContainer}>
        <SecondSection />
      </section>
    </main>
  );
}
