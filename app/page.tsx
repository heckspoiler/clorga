import styles from './page.module.css';

import FirstSection from './components/FirstSection/FirstSection';
import SecondSection from './components/SecondSection/SecondSection';

export type Idea = {
  id: number;
  title: string;
  created_at: string;
  description: string;
  tags: Array<string> | null;
};

export type Project = {
  id: number;
  created_at: string;
  project_ideas: Array<Idea>;
  project_name: string | null;
  due_date: string | null;
  project_tags: Array<string> | null;
};

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
