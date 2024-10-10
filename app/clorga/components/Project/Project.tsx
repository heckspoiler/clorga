'use client';

import React, { useState } from 'react';
import Draggable from 'react-draggable';
import type { Project as ProjectType } from '../../page';
import styles from './Project.module.css';

interface ProjectProps {
  project: ProjectType;
  updateLineCoordinates: () => void;
  index: number;
}

const pastelColors = [
  '#FFB3BA', // Light pink
  '#FFDFBA', // Light peach
  '#FFFFBA', // Light yellow
  '#BAFFC9', // Light mint
  '#BAE1FF', // Light blue
  '#D4A5A5', // Soft mauve
  '#B5EAD7', // Soft green
  '#C7CEEA', // Lavender blue
  '#FFC8A2', // Light coral
  '#FFD3B6', // Peach
  '#FF9AA2', // Soft rose
  '#E2F0CB', // Pastel green
  '#B0E57C', // Light lime
  '#C3B1E1', // Light purple
  '#F5C6EC', // Light pink-purple
];

const Project = React.forwardRef<HTMLDivElement, ProjectProps>(
  ({ project, updateLineCoordinates, index }, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedIdea, setSelectedIdea] = useState<string | null>(null);

    // Find the selected idea object based on selectedIdea title
    const selectedIdeaObj = project.project_ideas.find(
      (idea) => idea.title.toLowerCase() === selectedIdea
    );

    const handleSelectIdea = (ideaTitle: string) => {
      setSelectedIdea(ideaTitle);
      setIsDropdownOpen(false); // Close dropdown on selection
    };

    return (
      <Draggable onDrag={updateLineCoordinates} onStop={updateLineCoordinates}>
        <div
          ref={ref}
          style={{
            position: 'absolute',
            top: `200px`,
            left: `${index === 0 ? 1 : 21 * index}rem`,
            cursor: 'move',
          }}
          className={styles.Project}
        >
          <div
            className={styles.TitleContainer}
            style={{
              backgroundColor: pastelColors[index % pastelColors.length],
            }}
          >
            <h3>{project.project_name}</h3>
          </div>

          <div className={styles.IdeaContainer}>
            <div className={styles.IdeaDropdownContainer}>
              <label>Select Idea</label>
              <button
                className={styles.DropdownButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedIdea || 'Select an idea'}
              </button>

              {isDropdownOpen && (
                <div className={styles.OptionsContainer}>
                  {project.project_ideas.map((idea, ideaIndex) => (
                    <div
                      key={ideaIndex}
                      className={styles.Option}
                      onClick={() => handleSelectIdea(idea.title.toLowerCase())}
                    >
                      {idea.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedIdea && (
              <>
                <div className={styles.TagsContainer}>
                  <label>Tags</label>
                  <div className={styles.Tags}>
                    {selectedIdeaObj?.tags?.map((tag, index) => (
                      <p key={index} className={styles.Tag}>
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
                <div className={styles.DescriptionContainer}>
                  <label>Description</label>
                  <p>{selectedIdeaObj?.description}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </Draggable>
    );
  }
);

export default Project;
