'use client';

import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import type { Project as ProjectType, Idea } from '../../page';
import styles from './Project.module.css';
import { formatDate } from '@/utils/helpers/formatDate';
import { formattedDate } from '@/utils/helpers/handleFormSubmit';

import { warningShades } from '@/utils/colorArrays';
import { tooltipColorSetter } from '@/utils/helpers/tooltipColorSetter';
import Duedate from './Duedate/Duedate';

interface ProjectProps {
  project: ProjectType;
  updateLineCoordinates: () => void;
  index: number;
  isSpacebar: boolean;
  scaleSize: number;
  onIdeaClick: (idea: Idea) => void;
  highlightedIdeas: string[]; // Array of highlighted idea IDs
}

const Project = React.forwardRef<HTMLDivElement, ProjectProps>(
  (
    {
      project,
      updateLineCoordinates,
      index,
      isSpacebar,
      scaleSize,
      onIdeaClick,
      highlightedIdeas,
    },
    ref
  ) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
    const safeGreen = '#a1d99b';
    const [backgroundColor, setBackgroundColor] = useState('');
    const [amountDays, setAmountDays] = useState<number>();
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    // Find the selected idea object based on selectedIdea title
    const selectedIdeaObj = project.project_ideas.find(
      (idea) => idea.title.toLowerCase() === selectedIdea
    );

    const handleSelectIdea = (ideaTitle: string) => {
      setSelectedIdea(ideaTitle);
      setIsDropdownOpen(false); // Close dropdown on selection

      // Find the clicked idea object and trigger the onIdeaClick callback
      const clickedIdea = project.project_ideas.find(
        (idea) => idea.title.toLowerCase() === ideaTitle
      );
      if (clickedIdea) {
        onIdeaClick(clickedIdea); // Trigger the idea click handler
      }
    };

    useEffect(() => {
      if (!project.due_date) {
        return;
      } else {
        tooltipColorSetter({
          project,
          formattedDate,
          setAmountDays,
          setBackgroundColor,
          safeGreen,
          warningShades,
        });
      }
    }, []);

    const affectedProject = project?.project_name;

    const itemsPerRow = 5;
    const rowHeight = 220;
    const columnWidth = 21;

    return (
      <Draggable
        onDrag={updateLineCoordinates}
        onStop={updateLineCoordinates}
        disabled={isSpacebar}
        cancel=".NonDraggable"
      >
        <div
          onMouseEnter={() => setHoveredProject(project.project_name)}
          onMouseLeave={() => setHoveredProject(null)}
          ref={ref}
          style={{
            position: 'absolute',
            top: `${Math.floor(index / itemsPerRow) * rowHeight + 50}px`, // Calculate row based on index
            left: `${(index % itemsPerRow) * columnWidth + 1.5}rem`, // Calculate column based on index
            cursor: 'move',
            zIndex: hoveredProject === affectedProject ? 2 : 0,
            scale:
              scaleSize < 1 && hoveredProject === affectedProject ? 1.2 : 1,
          }}
          className={styles.Project}
        >
          <div
            className={styles.TitleContainer}
            style={{
              backgroundColor: project.color || 'white',
            }}
          >
            <h3>
              {project?.project_name && project.project_name.length > 20
                ? `${project.project_name.slice(0, 18)}...`
                : project?.project_name || ''}
            </h3>

            <Duedate
              styles={styles}
              backgroundColor={backgroundColor}
              amountDays={amountDays}
              formatDate={formatDate}
              project={project}
              index={index}
            />
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
                  <div
                    key={''}
                    className={styles.Option}
                    onClick={() => handleSelectIdea('')}
                    style={{ backgroundColor: 'rgb(255, 181, 181)' }}
                  >
                    Clear selection
                  </div>
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
              <div className={styles.IdeaContainerLower}>
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
                <div className={styles.DescriptionContainer}>
                  <label>Submitted by: </label>
                  <p>{selectedIdeaObj?.author}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Draggable>
    );
  }
);

export default Project;
