import styles from './page.module.css';

import FirstSection from './components/FirstSection/FirstSection';
import SecondSection from './components/SecondSection/SecondSection';

export default async function Index() {
  return (
    <>
      <main className={styles.Main}>
        <section className={styles.SectionContainer}>
          <FirstSection />
        </section>
        <section className={styles.SectionContainer}>
          <SecondSection />
        </section>
      </main>
    </>
  );
}
