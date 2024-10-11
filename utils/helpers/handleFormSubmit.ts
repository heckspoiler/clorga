// utils/formHelpers.js
import { createClient } from '@supabase/supabase-js';
import { formatDate } from './formatDate';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

export const handleProjectSubmit = async ({
  projectName,
  projectTags,
  projectDueDate,
  ideaTitle,
  ideaAuthor,
  ideaDescription,
  selectedTagsForIdea,
  setIsSubmitted,
  projectColor,
}: {
  projectName: string;
  projectTags: string[];
  projectDueDate: string | Date;
  ideaTitle: string;
  ideaAuthor: string;
  ideaDescription: string;
  selectedTagsForIdea: Set<string>;
  setIsSubmitted: (isSubmitted: boolean) => void;
  projectColor: string;
}) => {
  if (projectName === '') {
    alert('Project name is required.');
    console.error('Project name is required.');
    return;
  }

  try {
    const formattedDueDate = projectDueDate
      ? new Date(projectDueDate).toISOString()
      : null;
    const actualProjectName =
      projectName === '' ? 'Untitled Project' : projectName;

    // Check if the project already exists
    const { data: existingProjects, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .eq('project_name', actualProjectName);

    if (fetchError) throw fetchError;

    const newIdea = {
      tags: selectedTagsForIdea ? Array.from(selectedTagsForIdea) : [],
      title: ideaTitle,
      created_at: formatDate(new Date().toISOString()),
      description: ideaDescription,
      author: ideaAuthor,
    };

    let projectData;
    if (existingProjects && existingProjects.length > 0) {
      // Project exists, add to it
      const existingProject = existingProjects[0];

      const updatedTags = Array.from(
        new Set([...existingProject.project_tags, ...projectTags])
      );
      const updatedIdeas = [...existingProject.project_ideas, newIdea];

      const { data, error } = await supabase
        .from('projects')
        .update({
          project_tags: updatedTags,
          due_date: formattedDueDate || existingProject.due_date,
          project_ideas: updatedIdeas,
          color: projectColor,
        })
        .eq('id', existingProject.id);

      if (error) throw error;
      projectData = data;
    } else {
      const { data, error } = await supabase.from('projects').insert({
        project_name: actualProjectName.toLowerCase(),
        project_tags: projectTags,
        due_date: formattedDueDate,
        project_ideas: [newIdea],
        color: projectColor,
      });

      if (error) throw error;
      projectData = data;
    }

    setIsSubmitted(true);
  } catch (error) {
    console.error('Error during project operation:', error);
    throw error;
  }
};
