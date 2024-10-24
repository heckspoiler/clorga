import { createClient } from '@/utils/supabase/server';
import InputField from '@/app/clorga/components/InputField/InputField';

import styles from './page.module.css';
import MapCanvas from './components/MapCanvas/MapCanvas';

export type Idea = {
  id: number;
  title: string;
  created_at: string;
  description: string;
  tags: Array<string> | null;
  author?: string;
};

export type Project = {
  id: number;
  created_at: string;
  project_ideas: Array<Idea>;
  project_name: string | null;
  due_date: string | null;
  project_tags: Array<string> | null;
  color: string;
  organization_id?: string;
  organization_name?: string;
};

export default async function Index() {
  const supabase = createClient();
  const { data: initialProjects } = await supabase.from('projects').select('*');

  console.log(initialProjects);

  return (
    <section className={styles.Main}>
      <MapCanvas initialProjects={initialProjects} />
    </section>
  );
}
