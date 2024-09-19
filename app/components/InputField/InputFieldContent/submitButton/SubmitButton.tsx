'use client';

import React, { useEffect, useState } from 'react';
import { newProjectStore } from '@/utils/newProjectStore';
import { isSubmittedStore } from '@/utils/isSubmittedStore';
import { IsSubmittedStoreType } from '@/utils/isSubmittedStore';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

export default function SubmitButton({ styles }: { styles: any }) {
  const {
    projectName,
    projectTags,
    projectDueDate,
    ideaTitle,
    ideaAuthor,
    ideaDescription,
    selectedTagsForIdea,
  } = newProjectStore();

  const { isSubmitted, setIsSubmitted } =
    isSubmittedStore() as IsSubmittedStoreType;

  useEffect(() => {
    setIsSubmitted(false);
  }, [
    projectName,
    projectTags,
    projectDueDate,
    ideaTitle,
    ideaAuthor,
    ideaDescription,
    selectedTagsForIdea,
  ]);

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (isSubmitted) {
      return;
    }

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
        created_at: new Date().toISOString(),
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
          })
          .eq('id', existingProject.id);

        if (error) throw error;
        projectData = data;
        console.log('Added to existing project:', actualProjectName);
      } else {
        const { data, error } = await supabase.from('projects').insert({
          project_name: actualProjectName.toLowerCase(),
          project_tags: projectTags,
          due_date: formattedDueDate,
          project_ideas: [newIdea],
        });

        if (error) throw error;
        projectData = data;
        console.log('Created new project:', actualProjectName);
      }

      console.log('Operation completed successfully:', projectData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error during project operation:', error);
    }
  };

  return (
    <button className={styles.Submit} onClick={handleSubmit}>
      Submit
    </button>
  );
}
