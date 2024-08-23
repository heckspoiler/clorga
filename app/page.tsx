import { createClient } from '@/utils/supabase/server';
import InputField from '@/components/InputField/InputField';

type Idea = {
  id: number;
  created_at: string;
  project_name: string;
  idea_title: string;
  idea_description: string;
  tags: string[];
};

export default async function Index() {
  const supabase = createClient();
  const { data: ideas } = await supabase.from('ideas').select('*');

  return (
    <main>
      {ideas && <InputField ideas={ideas} />}

      <div>
        {ideas?.map((idea: Idea) => (
          <div key={idea.id}>
            <h2>{idea.project_name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
