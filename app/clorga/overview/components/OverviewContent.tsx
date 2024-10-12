'use client';

import React, { useState } from 'react';
import { projectStore } from '@/utils/projectstore';
import { useProjects } from '@/utils/supabase/useProjects';
import CellContainer from './CellContainer/CellContainer';
import styles from './OverviewContent.module.css';
import ProjectsField from './projectsField/ProjectsField';

export default function OverviewContent() {
  const { projectsStore } = projectStore();
  const { projects } = useProjects(projectsStore);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const projectName = projects?.map((project) => project.project_name);

  return (
    <div>
      <div className={styles.TitleContainer}>
        <h1>Overview</h1>
      </div>
      <CellContainer
        title={`${activeProject ? activeProject : 'select project'}`}
      >
        <ProjectsField
          projects={projects}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
      </CellContainer>
    </div>
  );
}
