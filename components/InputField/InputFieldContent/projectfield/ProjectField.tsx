import React from 'react';
import { Idea } from '../InputFieldForm';

export default function ProjectField({
  styles,
  ideas,
}: {
  styles: any;
  ideas: Idea[];
}) {
  const projects = ideas?.map((idea, index) => {
    return idea.project_name;
  });
  return (
    <div className={styles.TagsContainer}>
      <div className={styles.FormCell}>
        <label htmlFor="project">Project:</label>
        <div className={styles.Tags}>
          {projects.map((project, index) => (
            <div
              data-clickable="true"
              key={index}
              className={styles.Project}
              data-value={project}
            >
              {project}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
