'use client';

import React, { useState, useEffect } from 'react';
import { useProjects } from '@/utils/supabase/useProjects';
import type { Project } from '@/app/clorga/page';
import Canvas from './Canvas';
import ScaleContainer from './ScaleButton/ScaleContainer';
import InputField from '../InputField/InputField';
import styles from './MapCanvas.module.css';
import { projectStore } from '@/utils/projectstore';
import { useOrganizationStore } from '@/utils/OrganizationStore';

export default function MapCanvas({
  initialProjects,
}: {
  initialProjects: Project[] | null;
}) {
  const { projects } = useProjects(initialProjects);
  const [scaleSize, setScaleSize] = useState(1);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showLines, setShowLines] = useState(false);

  const { projectsStore, setProjects } = projectStore();
  const { setOrganizationId, setOrganizationName } = useOrganizationStore();

  useEffect(() => {
    if (
      projects &&
      projects[0] &&
      typeof projects[0].organization_id === 'string' &&
      typeof projects[0].organization_name === 'string'
    ) {
      console.log(projects[0].organization_name);
      setOrganizationId(projects[0].organization_id);
      setOrganizationName(projects[0].organization_name);
    }
  }, [projects]);

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
        onClick={() => setIsVisible(false)}
      ></div>
      <Canvas
        styles={styles}
        projects={projects}
        scaleSize={scaleSize}
        setScaleSize={setScaleSize}
        selectedIdea={selectedIdea}
        setSelectedIdea={setSelectedIdea}
        isVisible={isVisible}
        showLines={showLines}
      />
      <ScaleContainer
        scaleSize={scaleSize}
        setScaleSize={setScaleSize}
        styles={styles}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        showLines={showLines}
        setShowLines={setShowLines}
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
