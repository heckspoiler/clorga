import { Project } from '@/app/clorga/page';
import React, { useState } from 'react';
import styles from './ProjectsField.module.css';
import { active } from 'd3';

export default function ProjectsField({
  projects,
  activeProject,
  setActiveProject,
}: {
  projects: Project[] | null;
  activeProject: string | null;
  setActiveProject: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <button
        onClick={toggleDropdown}
        style={{ marginBottom: '0.5rem' }}
        className={styles.SelectButton}
      >
        {activeProject ? activeProject : 'Select Project'}
      </button>
      {isDropdownOpen && (
        <div
          onMouseLeave={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            border: 'var(--border)',
            padding: '1rem',
            width: 'fit-content',
            borderRadius: 'var(--radius)',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {projects?.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.Project} ${
                activeProject === project.project_name ? styles.Active : ''
              }`}
              style={{
                backgroundColor: project.color,
                padding: '0.5rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                setActiveProject(project.project_name);
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              <h3 style={{ margin: 0 }}>{project.project_name}</h3>
            </div>
          ))}
          <div
            key="clear"
            className={styles.Project}
            style={{
              padding: '0.5rem',
              cursor: 'pointer',
              marginTop: '4rem',
            }}
            onClick={() => {
              setActiveProject('');
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <h3 style={{ margin: 0 }}>clear selection</h3>
          </div>
        </div>
      )}
    </div>
  );
}
