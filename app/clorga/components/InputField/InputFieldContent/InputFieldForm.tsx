'use client';

import React, { useState, useEffect } from 'react';
import styles from './InputFieldForm.module.css';
import TagField from './tagfield/TagField';
import ProjectField from './projectfield/ProjectField';

import { newProjectStore } from '@/utils/newProjectStore';

import Idea from './ideaField/Idea';

import type { Project } from '@/app/clorga/page';
import IdeaTextField from './ideaTextField/IdeaTextField';
import SubmitButton from './submitButton/SubmitButton';
import DateField from './dateField/DateField';

export type Idea = {
  id: number;
  created_at: string;
  project_name: string;
  idea_title: string;
  idea_description: string;
  tags: string[];
};

export default function InputFieldForm({ projects }: { projects: Project[] }) {
  const projectProp = projects.map((project) => project.project_name);

  // Zustand Stores

  const { newProject, setNewProject } = newProjectStore();

  // useStates
  const [selectedProject, setSelectedProject] = useState('');

  return (
    <form className={styles.Form}>
      <div className={styles.FormContainer}>
        <ProjectField
          styles={styles}
          projects={projectProp.filter(Boolean)}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <DateField styles={styles} newProject={newProject} />
        <Idea styles={styles} />
        <IdeaTextField styles={styles} />
        <TagField
          styles={styles}
          selectedProject={selectedProject}
          projects={projects}
        />
        <div className={styles.ButtonContainer}>
          <SubmitButton styles={styles} />
        </div>
      </div>
    </form>
  );
}
