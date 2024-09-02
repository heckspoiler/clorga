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
    selectedTagsForIdea,
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
            tags: selectedTagsForIdea ? Array.from(selectedTagsForIdea) : [],
            title: ideaTitle,
            created_at: new Date(),
            description: ideaDescription,
            author: ideaAuthor,
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
