import { Project } from '@/app/clorga/page';
import React, { useState } from 'react';
import styles from './ProjectsDropdown.module.css';

export default function ProjectsDropdown({
  projects,
  activeProject,
  setActiveProject,
}: {
  projects: Project[] | null;
  activeProject: string | null;
  setActiveProject: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isHovered, setIsHovered] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {/* <button
        onClick={toggleDropdown}
        style={{ marginBottom: '0.5rem' }}
        className={styles.SelectButton}
      >
        {activeProject ? activeProject : 'Select Project'}
      </button> */}
      {isDropdownOpen && (
        <div
          // onMouseLeave={() => setIsDropdownOpen(!isDropdownOpen)}
          className={styles.DropdownMenu}
        >
          {projects?.map((project, index) => (
            <div
              onMouseEnter={() => setIsHovered(project.project_name || '')}
              onMouseLeave={() => setIsHovered('')}
              key={project.id}
              className={styles.Project}
              style={{
                backgroundColor: `${
                  isHovered === project.project_name ||
                  activeProject === project.project_name
                    ? project.color
                    : 'white'
                }`,
                cursor: 'pointer',
              }}
              onClick={() => {
                setActiveProject(project.project_name);
                // setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              <h3 style={{ margin: 0 }}>{project.project_name}</h3>
            </div>
          ))}
          <div
            style={{
              padding: '1rem',
              cursor: 'pointer',
            }}
          >
            <div
              key="clear"
              className={styles.Project}
              style={{
                padding: '0.5rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                setActiveProject('');
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              <h3 style={{ margin: 0 }}>clear selection</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
