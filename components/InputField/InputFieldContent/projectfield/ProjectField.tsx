import React, { useState } from 'react';
import AddProjectField from './AddProjectField';

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
  const [newProject, setNewProject] = useState('');
  const [submitTagWindowIsOpen, setSubmitTagWindowIsOpen] = useState(false);

  const handleProjectClick = (project: string) => {
    if (selectedProject === project) {
      setSelectedProject('');
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <div className={styles.TagsContainer}>
      <div className={styles.FormCell}>
        <label htmlFor="project">Project:</label>

        <div className={styles.Tags}>
          <div
            className={styles.AddTag}
            onClick={() => setSubmitTagWindowIsOpen(!submitTagWindowIsOpen)}
          >
            {submitTagWindowIsOpen ? 'close' : 'new project'}
          </div>
          {projects?.map(
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
        />
      </div>
    </div>
  );
}
