// app/clorga/components/MapCanvas/MapCanvas.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useProjects } from '@/utils/supabase/useProjects';
import type { Project } from '@/app/clorga/page';
import BringBackButton from '../../../components/general/BringBackButton';
import Canvas from './Canvas';
import ScaleContainer from './ScaleButton/ScaleContainer';
import InputField from '../InputField/InputField';
import styles from './MapCanvas.module.css';
import { projectStore } from '@/utils/projectstore';

export default function MapCanvas({
  initialProjects,
}: {
  initialProjects: Project[] | null;
}) {
  const { projects } = useProjects(initialProjects);
  const [scaleSize, setScaleSize] = useState(1);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const { projectsStore, setProjects } = projectStore();

  useEffect(() => {
    if (projects) setProjects(projects);
  }, [projects]);

  useEffect(() => {
    if (scaleSize < 0.5) setScaleSize(0.5);
  }, [scaleSize]);

  useEffect(() => {
    setTimeout(() => setIsVisible(false), 500);
  }, []);

  return (
    <div className={styles.Main}>
      <div
        className={`${styles.Overlay} ${
          isVisible ? styles.OverlayVisible : ''
        }`}
      ></div>
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
        <InputField
          initialProjects={initialProjects}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
    </div>
  );
}
