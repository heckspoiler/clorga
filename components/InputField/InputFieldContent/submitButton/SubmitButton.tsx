import React from 'react';
import { newProjectStore } from '@/utils/newProjectStore';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

export default function SubmitButton({ styles }: { styles: any }) {
  const {
    projectName,
    projectTags,
    projectDueDate,
    projectIdeas,
    ideaTitle,
    ideaAuthor,
    ideaDescription,
  } = newProjectStore();

  const handleSubmit = async (event: any) => {
    // event.preventDefault();
    try {
      const { data, error } = await supabase.from('projects').insert({
        project_name: projectName,
        project_tags: projectTags,
        due_date: projectDueDate,
        project_ideas: [
          {
            tags: ['healthcare', 'AI', 'research'],
            title: ideaTitle,
            created_at: new Date(),
            description: ideaDescription,
            author: ideaAuthor,
          },
          {
            tags: ['education', 'online-learning', 'EdTech'],
            title: 'Idea 4',
            created_at: '2023-08-27T14:45:00Z',
            description: 'Description of idea 4',
          },
          {
            tags: ['finance', 'blockchain', 'cryptocurrency'],
            title: 'Idea 5',
            created_at: '2023-08-28T11:15:00Z',
            description: 'Description of idea 5',
          },
        ],
      });

      if (error) throw error;

      console.log('Project submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  return (
    <button className={styles.Submit} onClick={handleSubmit}>
      Submit
    </button>
  );
}
