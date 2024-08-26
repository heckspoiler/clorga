import { createClient } from '@/utils/supabase/server';
import InputField from '@/components/InputField/InputField';

import { formStore } from '@/utils/formstore';

type Idea = {
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
  // const { data: ideas } = await supabase.from('ideas').select('*');

  const { data: projects } = await supabase.from('projects').select('*');

  console.log(
    projects?.forEach((project: Project) => console.log(project.project_name))
  );

  return (
    <main>
      {projects && <InputField projects={projects} />}

      <div>
        {projects?.map((project: Project) => (
          <div key={project.id}>
            <h2>{project.project_name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
