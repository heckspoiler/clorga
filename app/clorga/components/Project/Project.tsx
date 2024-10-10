'use client';

import React, { useState } from 'react';
import Draggable from 'react-draggable';
import type { Project as ProjectType } from '../../page';
import styles from './Project.module.css';

interface ProjectProps {
  project: ProjectType;
  updateLineCoordinates: () => void;
  index: number;
  isSpacebar: boolean;
}

export const pastelColors = [
  '#FFB3BA',
  '#FFDFBA',
  '#FFFFBA',
  '#BAFFC9',
  '#BAE1FF',
  '#D4A5A5',
  '#B5EAD7',
  '#C7CEEA',
  '#FFC8A2',
  '#FFD3B6',
  '#FF9AA2',
  '#E2F0CB',
  '#B0E57C',
  '#C3B1E1',
  '#F5C6EC',
];

const Project = React.forwardRef<HTMLDivElement, ProjectProps>(
  ({ project, updateLineCoordinates, index, isSpacebar }, ref) => {
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
      <Draggable
        onDrag={updateLineCoordinates}
        onStop={updateLineCoordinates}
        disabled={isSpacebar}
      >
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
