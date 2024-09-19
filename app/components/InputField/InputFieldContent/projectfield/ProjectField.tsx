'use client';

import React, { useState, useEffect } from 'react';
import AddProjectField from './AddProjectField';
import { newProjectStore } from '@/utils/newProjectStore';

import Plussign from '@/app/components/general/Plussign';

import { isSubmittedStore } from '@/utils/isSubmittedStore';

export default function ProjectField({
  styles,
  projects,
  selectedProject,
  setSelectedProject,
}: {
  styles: any;
  projects: (string | null)[];
  selectedProject: string;
  setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
}) {
  // zustand Stores

  const { newProject, setNewProject } = newProjectStore();
  const { projectName, setProjectName } = newProjectStore();
  const { isSubmitted } = isSubmittedStore();

  // useStates

  const [submitTagWindowIsOpen, setSubmitTagWindowIsOpen] = useState(false);

  const [projectsMappingArray, setProjectsMappingArray] = useState(projects);

  // setting active State for project that is being edited/created

  useEffect(() => {
    if (isSubmitted) {
      setProjectName('');
      setSelectedProject('');
    }
  }, [isSubmitted, setProjectName]);

  const handleProjectClick = (project: string) => {
    if (selectedProject !== project || selectedProject === '') {
      setSelectedProject(project);
      setProjectName(project);
      console.log(projectName);
    }
  };

  return (
    <div className={styles.TagsContainer}>
      <div className={styles.FormCell}>
        <label htmlFor="project">Project:</label>

        <div className={styles.Tags}>
          <div
            className={styles.AddTag}
            onClick={() => {
              setSubmitTagWindowIsOpen(!submitTagWindowIsOpen);
              setNewProject(!newProject);
            }}
          >
            <p>{submitTagWindowIsOpen ? 'close' : 'new project'}</p>
            <div className={styles.SvgContainer}>
              <Plussign height={'15px'} width={'15px'} />
            </div>
          </div>
          {projectsMappingArray?.map(
            (project, index) =>
              project && (
                <div
                  className={`${styles.Tag} ${
                    selectedProject === project.toLowerCase()
                      ? styles.TagClicked
                      : ''
                  }`}
                  key={index}
                  data-value={project.toLowerCase()}
                  data-clickable="true"
                  onClick={() => handleProjectClick(project.toLowerCase())}
                >
                  {project.toLowerCase()}
                </div>
              )
          )}
        </div>
      </div>
      <div className={styles.Legend}>
        <div className={styles.LegendRow}>
          <div></div>
          <p>not selected</p>
        </div>
        <div className={styles.LegendRow}>
          <div></div>
          <p>selected</p>
        </div>
      </div>
      <div
        className={`${styles.SubmitField} ${
          submitTagWindowIsOpen ? styles.SubmitFieldVisible : ''
        }`}
      >
        <AddProjectField
          state={submitTagWindowIsOpen}
          setState={setSubmitTagWindowIsOpen}
          styles={styles}
          projects={projects}
          newProject={newProject}
          setNewProject={setNewProject}
          projectName={projectName}
          setProjectName={setProjectName}
          projectsMappingArray={projectsMappingArray}
          setProjectsMappingArray={setProjectsMappingArray}
          setSelectedProject={setSelectedProject}
        />
      </div>
    </div>
  );
}
