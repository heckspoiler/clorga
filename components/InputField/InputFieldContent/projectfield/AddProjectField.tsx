'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { projectStore } from '@/utils/projectstore';

import { gsap } from 'gsap';

import { useGSAP } from '@gsap/react';

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
}) {
  // refs
  const inputRef = useRef<HTMLInputElement>(null);

  // zustand stores
  const { projectsStore, setProjects } = projectStore() as {
    projectsStore: any;
    setProjects: any;
  };

  // gsap

  const wiggle = useCallback(() => {
    if (inputRef.current) {
      gsap.to(inputRef.current, {
        keyframes: [
          {
            x: 3,
            y: -2,
            rotation: -1,
            scale: 1.02,
            backgroundColor: 'rgba(255, 255, 200, 0.5)',
            duration: 0.1,
          },
          {
            x: -3,
            y: 2,
            rotation: 1,
            scale: 1.02,
            backgroundColor: 'rgba(255, 255, 200, 0.5)',
            duration: 0.1,
          },
          {
            x: 3,
            y: -1,
            rotation: -0.5,
            scale: 1.01,
            backgroundColor: 'rgba(255, 255, 200, 0.3)',
            duration: 0.1,
          },
          {
            x: -3,
            y: 1,
            rotation: 0.5,
            scale: 1.01,
            backgroundColor: 'rgba(255, 255, 200, 0.3)',
            duration: 0.1,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            backgroundColor: 'transparent',
            duration: 0.1,
          },
        ],
        ease: 'power2.inOut',
      });
    }
  }, []);

  // methods/functions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setProjectName(event.target.value);
  };

  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (inputRef.current && inputRef.current.value === '') {
        event.preventDefault();
        wiggle();
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
