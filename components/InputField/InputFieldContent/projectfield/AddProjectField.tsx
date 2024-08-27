'use client';

import React, { useCallback, useRef } from 'react';
import { projectStore } from '@/utils/projectstore';

export default function AddProjectField({
  state,
  setState,
  styles,
  projects,
  newProject,
  setNewProject,
  projectName,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  styles: any;
  newProject: boolean;
  setNewProject: any;
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
    console.log(event.target.value);
    setNewProject(event.target.value);
  };

  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (newProject && !projectsStore.includes(projectName)) {
        const updatedProjects = [...projectsStore, projectName];
        setProjects(updatedProjects);
        setNewProject('');
        setState(false);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        console.log('Updated projects:', updatedProjects);
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
    <>
      <input
        onChange={handleInputChange}
        placeholder="Enter new Project"
        ref={inputRef}
      />
      <div onClick={handleSubmit} className={styles.SubmitButton}>
        add project
      </div>
    </>
  );
}
