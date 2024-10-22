'use client';

import React, { useEffect, useState, useRef } from 'react';
import type { Project as ProjectType, Idea } from '@/app/clorga/page';
import Project from '../Project/Project';
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheel,
} from '@/utils/helpers/canvasHandlers';

type CanvasProps = {
  styles: any;
  projects: ProjectType[] | null;
  scaleSize: number;
  selectedIdea: string | null;
  setScaleSize: React.Dispatch<React.SetStateAction<number>>;
  setSelectedIdea: React.Dispatch<React.SetStateAction<string | null>>;
  isVisible: boolean;
};

function getCommonTags(ideasA: string[], ideasB: string[]): number {
  const setA = new Set(ideasA);
  const setB = new Set(ideasB);
  const commonTags = [...setA].filter((tag) => setB.has(tag));
  return commonTags.length;
}

export default function Canvas({
  styles,
  projects,
  scaleSize,
  setScaleSize,
  selectedIdea,
  setSelectedIdea,
  isVisible,
}: CanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineCoordinates, setLineCoordinates] = useState<
    { x1: number; y1: number; x2: number; y2: number; thickness: number }[]
  >([]);
  const [isPanning, setIsPanning] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSpacebar, setIsSpacebar] = useState(false);
  const [enableZoom, setEnableZoom] = useState(false);
  const [highlightedIdeas, setHighlightedIdeas] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setIsSpacebar(true);
        setIsPanning(true);
      } else if (e.key === 'z') {
        e.preventDefault();
        setEnableZoom(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setIsSpacebar(false);
        setIsPanning(false);
      } else if (e.key === 'z') {
        e.preventDefault();
        setEnableZoom(false);
      }
    };

    if (!isVisible) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isVisible]);

  const calculateLineThickness = (commonTags: number) => {
    switch (commonTags) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 1.5;
      case 3:
        return 2;
      case 4:
        return 2.5;
      case 5:
        return 3;
      case 6:
        return 3.5;
      case 7:
        return 4;
      case 8:
        return 4.5;
      case 9:
        return 5;
      default:
        return 5.5;
    }
  };

  const updateLineCoordinates = (selectedIdeaTags: string[]) => {
    const coordinates = [];
    const highlighted = [];

    if (containerRef.current && projects) {
      const containerRect = containerRef.current.getBoundingClientRect();

      for (let i = 0; i < projectRefs.current.length; i++) {
        const project1 = projectRefs.current[i];

        for (let j = i + 1; j < projectRefs.current.length; j++) {
          const project2 = projectRefs.current[j];

          if (project1 && project2 && projects[i] && projects[j]) {
            const rect1 = project1.getBoundingClientRect();
            const rect2 = project2.getBoundingClientRect();
            const x1 =
              (rect1.left + rect1.width / 2 - containerRect.left) / scaleSize;
            const y1 =
              (rect1.top + rect1.height / 2 - containerRect.top) / scaleSize;
            const x2 =
              (rect2.left + rect2.width / 2 - containerRect.left) / scaleSize;
            const y2 =
              (rect2.top + rect2.height / 2 - containerRect.top) / scaleSize;

            const tags1 = projects[i].project_ideas.flatMap(
              (idea) => idea.tags
            );
            const tags2 = projects[j].project_ideas.flatMap(
              (idea) => idea.tags
            );

            const filteredTags1 = tags1.filter(
              (tag): tag is string => tag !== null
            );
            const filteredTags2 = tags2.filter(
              (tag): tag is string => tag !== null
            );
            const commonTags = getCommonTags(filteredTags1, filteredTags2);

            const thickness = calculateLineThickness(commonTags);

            if (thickness > 0) {
              coordinates.push({ x1, y1, x2, y2, thickness });

              if (selectedIdeaTags.some((tag) => filteredTags1.includes(tag))) {
                highlighted.push(
                  ...projects[i].project_ideas.map((idea) => String(idea.id))
                );
              }
              if (selectedIdeaTags.some((tag) => filteredTags2.includes(tag))) {
                highlighted.push(
                  ...projects[j].project_ideas.map((idea) => String(idea.id))
                );
              }
            }
          }
        }
      }
    }

    setLineCoordinates(coordinates);
    setHighlightedIdeas(highlighted);
  };
  const handleIdeaClick = (idea: Idea) => {
    setSelectedIdea(String(idea.id));
    updateLineCoordinates(
      idea.tags ? idea.tags.filter((tag): tag is string => tag !== null) : []
    );
  };

  return (
    <div
      className={styles.CanvasContainer}
      onMouseDown={(e) =>
        handleMouseDown(e, isPanning, setDragging, setStartPosition, position)
      }
      onMouseMove={(e) =>
        handleMouseMove(e, dragging, startPosition, setPosition)
      }
      onMouseUp={() => handleMouseUp(setDragging)}
      onMouseLeave={() => handleMouseUp(setDragging)}
      onWheel={(e) => handleWheel(e, enableZoom, scaleSize, setScaleSize)}
      style={{
        cursor: isPanning ? 'grab' : 'default',
      }}
    >
      <div
        className={styles.Container}
        ref={containerRef}
        style={{
          position: 'relative',
          transform: `translate(${position.x}px, ${position.y}px)`,
          scale: scaleSize,
          transformOrigin: 'center',
        }}
      >
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            transformOrigin: 'center',
          }}
        >
          {lineCoordinates.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(0, 0, 0, 0.5)"
              strokeWidth={line.thickness * scaleSize * 0.8}
            />
          ))}
        </svg>

        {projects?.map((project, index) => (
          <Project
            key={project.id}
            project={project}
            updateLineCoordinates={() => updateLineCoordinates([])}
            index={index}
            ref={(el) => (projectRefs.current[index] = el)}
            isSpacebar={isSpacebar}
            scaleSize={scaleSize}
            onIdeaClick={handleIdeaClick}
            highlightedIdeas={highlightedIdeas}
          />
        ))}
      </div>
    </div>
  );
}
