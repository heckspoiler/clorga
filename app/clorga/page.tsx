import { createClient } from '@/utils/supabase/server';
import InputField from '@/app/components/InputField/InputField';

import styles from './page.module.css';
import MapCanvas from '../components/MapCanvas/MapCanvas';
import { UserProvider } from '@/utils/context';
import { User } from 'lucide-react';

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
  const supabase = createClient();
  const { data: initialProjects } = await supabase.from('projects').select('*');

  return (
    <main className={styles.Main}>
      {initialProjects && <InputField initialProjects={initialProjects} />}
      <MapCanvas initialProjects={initialProjects} />
    </main>
  );
}
