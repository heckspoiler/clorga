'use client';

import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import type { Project as ProjectType } from '../../page';
import styles from './Project.module.css';
import { formatDate } from '@/utils/helpers/formatDate';
import { formattedDate } from '@/utils/helpers/handleFormSubmit';

import { warningShades } from '@/utils/colorArrays';
import { tooltipColorSetter } from '@/utils/helpers/tooltipColorSetter';

interface ProjectProps {
  project: ProjectType;
  updateLineCoordinates: () => void;
  index: number;
  isSpacebar: boolean;
  scaleSize: number;
}

const Project = React.forwardRef<HTMLDivElement, ProjectProps>(
  ({ project, updateLineCoordinates, index, isSpacebar, scaleSize }, ref) => {
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
      >
        <div
          onMouseEnter={() => setHoveredProject(project.project_name)}
          onMouseLeave={() => setHoveredProject(null)}
          ref={ref}
          style={{
            position: 'absolute',
            top: `${Math.floor(index / itemsPerRow) * rowHeight}px`, // Calculate row based on index
            left: `${(index % itemsPerRow) * columnWidth}rem`, // Calculate column based on index
            cursor: 'move',
            zIndex: hoveredProject === affectedProject ? 2 : 0,
            scale:
              scaleSize < 1 && hoveredProject === affectedProject
                ? 1 - scaleSize + 1
                : 1,
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
          </div>
          {/* Due Date Section */}
          <div className={styles.DueDateContainer}>
            <label>Due Date:</label>
            <div className={styles.DueDate}>
              <p key={index} className={styles.Date}>
                {formatDate(project.due_date)}
              </p>
              {project.due_date && (
                <div
                  style={{ backgroundColor: backgroundColor }}
                  className={styles.DueDateIndicator}
                >
                  <div className={styles.DueDateTooltip}>
                    {amountDays !== undefined && amountDays >= 0 ? (
                      <p>
                        due in <span>{amountDays}</span> days
                      </p>
                    ) : (
                      <p>
                        <span>overdue </span> ( {amountDays && amountDays * -1}{' '}
                        days)
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Close Due Date section */}
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
                    style={{ backgroundColor: 'rgb(246, 253, 203)' }}
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
