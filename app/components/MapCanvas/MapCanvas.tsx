'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

// type imports

import { Project } from '@/app/page';
import { Idea } from '@/app/page';
import BringBackButton from '../general/BringBackButton';
import Topbar from '../topbar/Topbar';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function MapCanvas({
  initialProjects,
}: {
  initialProjects: Project[] | any[] | null;
}) {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  const [projects, setProjects] = useState<Project[] | any[] | null>(
    initialProjects
  );

  const { isSubmitted, setIsSubmitted } = isSubmittedStore();

  const fetchProjects = useCallback(async () => {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) console.log('error', error);
    else setProjects(data);
  }, [supabase]);

  useEffect(() => {
    fetchProjects();

    const channel = supabase
      .channel('public:projects')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        (payload) => {
          console.log('Change received!', payload);
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [fetchProjects, isSubmitted]);

  return (
    <div>
      <Topbar />
      {projects?.map((project: Project, index: number) => (
        <div key={`${project.id} ${index}`}>
          <h2>{project.project_name}</h2>
          <div>
            {project.project_ideas.map((idea: Idea, index: number) => (
              <div key={index}>
                <h3>{idea.title}</h3>
                <p>{idea.description}</p>
                <p>{idea.tags?.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <BringBackButton />
    </div>
  );
}
