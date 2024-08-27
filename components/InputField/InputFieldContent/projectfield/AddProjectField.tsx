'use client';

import React, { useCallback } from 'react';

export default function AddProjectField({
  state,
  setState,
  styles,
  projects,
  newProject,
  setNewProject,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  styles: any;
  newProject: string;
  setNewProject: React.Dispatch<React.SetStateAction<string>>;
  projects: (string | null)[];
}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProject(event.target.value);
  };

  const addNewProject = useCallback(() => {
    if (newProject && !projects.includes(newProject)) {
      projects.push(newProject);
      setNewProject('');
      setState(false);
    }
  }, [newProject, setNewProject, setState]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addNewProject();
    setState(!state);
  };

  return (
    <>
      <input
        value={newProject}
        onChange={handleInputChange}
        placeholder="Enter new Project"
      />
      <button onClick={handleSubmit} className={styles.SubmitButton}>
        add project
      </button>
    </>
  );
}
