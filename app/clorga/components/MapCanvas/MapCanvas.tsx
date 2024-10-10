'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

// type imports
import type { Project } from '@/app/clorga/page';

import BringBackButton from '../../../components/general/BringBackButton';

import styles from './MapCanvas.module.css';
import Canvas from './Canvas';
import ScaleContainer from './ScaleButton/ScaleButton';
import InputField from '../InputField/InputField';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const props = {};

export default function MapCanvas({
  initialProjects,
}: {
  initialProjects: Project[] | any[] | null;
}) {
  const [projects, setProjects] = useState<Project[] | any[] | null>(
    initialProjects
  );

  const { isSubmitted, setIsSubmitted } = isSubmittedStore();
  const [scaleSize, setScaleSize] = useState(1);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (scaleSize < 0.5) {
      setScaleSize(0.5);
    }
  }, [scaleSize]);

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
    <div className={styles.Main}>
      <Canvas
        styles={styles}
        projects={projects}
        scaleSize={scaleSize}
        setScaleSize={setScaleSize}
        selectedIdea={selectedIdea}
        setSelectedIdea={setSelectedIdea}
      />
      <BringBackButton />
      <ScaleContainer
        scaleSize={scaleSize}
        setScaleSize={setScaleSize}
        styles={styles}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      {initialProjects && (
        <InputField initialProjects={initialProjects} isVisible={isVisible} />
      )}
    </div>
  );
}
