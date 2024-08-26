'use client';

import React, { useState, useEffect } from 'react';
import styles from './InputFieldForm.module.css';
import TagField from './tagfield/TagField';
import ProjectField from './projectfield/ProjectField';

import { Project } from '@/app/page';

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

  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);

  return (
    <form className={styles.Form}>
      <div className={styles.FormContainer}>
        <div className={styles.FormCell}>
          <label htmlFor="idea">Idea:</label>
          <input
            id="idea"
            type="text"
            placeholder="Enter Idea"
            data-clickable="true"
          />
        </div>
        <div className={styles.FormCell}>
          <label htmlFor="name">By:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Name"
            data-clickable="true"
          />
        </div>
        <ProjectField
          styles={styles}
          projects={projectProp.filter(Boolean)}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <TagField
          styles={styles}
          selectedProject={selectedProject}
          projects={projects}
        />
        <button className={styles.Submit}>Submit</button>
      </div>
    </form>
  );
}
