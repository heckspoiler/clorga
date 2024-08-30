'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { projectStore } from '@/utils/projectstore';

export default function AddProjectField({
  state,
  setState,
  styles,
  projects,
  newProject,
  setNewProject,
  projectName,
  setProjectName,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  styles: any;
  newProject: boolean;
  setNewProject: (newProject: boolean) => void;
  projects: (string | null)[];
  projectName: string;
  setProjectName: (projectName: string) => void;
}) {
  // refs
  const inputRef = useRef<HTMLInputElement>(null);

  // zustand stores
  const { projectsStore, setProjects } = projectStore() as {
    projectsStore: any;
    setProjects: any;
  };

  // methods/functions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setProjectName(event.target.value);
  };

  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (newProject && !projectsStore.includes(projectName)) {
        const updatedProjects = [...projectsStore, projectName];
        setProjects(updatedProjects);
        setState(false);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    },
    [
      newProject,
      projectName,
      projectsStore,
      setProjects,
      setState,
      setNewProject,
    ]
  );

  return (
    <div className={styles.InputProject}>
      <input
        onChange={handleInputChange}
        placeholder="Project Name"
        ref={inputRef}
      />
      <div onClick={handleSubmit} className={styles.SubmitButton}>
        add project
      </div>
    </div>
  );
}