'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { projectStore } from '@/utils/projectstore';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

// helper imports
import { wiggleElement } from '@/utils/helpers/wiggleAnimation';
import { handleInputChange } from '@/utils/helpers/handleInputChange';

export default function AddProjectField({
  state,
  setState,
  styles,
  projects,
  newProject,
  setNewProject,
  projectName,
  setProjectName,
  projectsMappingArray,
  setProjectsMappingArray,
  setSelectedProject,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  styles: any;
  newProject: boolean;
  setNewProject: (newProject: boolean) => void;
  projects: (string | null)[];
  projectName: string;
  setProjectName: (projectName: string) => void;
  projectsMappingArray: (string | null)[];
  setProjectsMappingArray: (projectsMappingArray: (string | null)[]) => void;
  setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { projectsStore, setProjects } = projectStore() as {
    projectsStore: any;
    setProjects: any;
  };
  const { isSubmitted, setIsSubmitted } = isSubmittedStore();

  useEffect(() => {
    if (isSubmitted) {
      setProjectName('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setIsSubmitted(false); // Reset the submitted state
    }
  }, [isSubmitted, setProjectName, setIsSubmitted]);

  // methods/functions

  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (inputRef.current && inputRef.current.value === '') {
        event.preventDefault();
        wiggleElement(inputRef.current);
        return;
      }
      if (
        newProject &&
        !projectsStore.includes(projectName) &&
        inputRef.current &&
        inputRef.current.value !== ''
      ) {
        const updatedProjects = [...projectsStore, projectName];
        setProjects(updatedProjects);
        setSelectedProject(projectName);
        setState(false);
        setProjectsMappingArray([...projectsMappingArray, projectName]);
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
      projects,
    ]
  );

  return (
    <div className={styles.InputProject}>
      <input
        onChange={(e) => handleInputChange(e, setProjectName)}
        placeholder="Project Name"
        ref={inputRef}
      />
      <div onClick={handleSubmit} className={styles.SubmitButton}>
        add project
      </div>
    </div>
  );
}
