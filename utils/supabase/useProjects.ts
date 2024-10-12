// hooks/useProjects.ts
import { useState, useEffect, useCallback } from 'react';
import { createClient } from './client';
import { isSubmittedStore } from '@/utils/isSubmittedStore';
import type { Project } from '@/app/clorga/page';

const supabase = createClient();

export function useProjects(initialProjects: Project[] | null) {
  const [projects, setProjects] = useState<Project[] | null>(initialProjects);
  const { isSubmitted } = isSubmittedStore();

  const fetchProjects = useCallback(async () => {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) console.error('Error fetching projects:', error);
    else setProjects(data);
  }, []);

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

  return { projects, refetch: fetchProjects };
}
