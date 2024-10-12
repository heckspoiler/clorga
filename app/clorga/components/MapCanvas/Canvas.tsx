'use client';

import React, { useEffect, useState, useRef } from 'react';
import type { Project as ProjectType } from '@/app/clorga/page';
import Project from '../Project/Project';

type CanvasProps = {
  styles: any;
  projects: ProjectType[] | null;
  scaleSize: number;
  selectedIdea: string | null;
  setScaleSize: React.Dispatch<React.SetStateAction<number>>;
  setSelectedIdea: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function Canvas({
  styles,
  projects,
  scaleSize,
  setScaleSize,
  selectedIdea,
  setSelectedIdea,
}: CanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineCoordinates, setLineCoordinates] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([]);
  const [isPanning, setIsPanning] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSpacebar, setIsSpacebar] = useState(false);
  const [enableZoom, setEnableZoom] = useState(false);

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

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const updateLineCoordinates = () => {
    const coordinates = [];

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();

      for (let i = 0; i < projectRefs.current.length - 1; i++) {
        const project1 = projectRefs.current[i];
        const project2 = projectRefs.current[i + 1];

        if (project1 && project2) {
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

          coordinates.push({ x1, y1, x2, y2 });
        }
      }
    }

    setLineCoordinates(coordinates);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0 && enableZoom) {
      e.preventDefault();
      setScaleSize(scaleSize - 0.005);
    } else if (e.deltaY < 0 && enableZoom) {
      e.preventDefault();
      setScaleSize(scaleSize + 0.005);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPanning) {
      setDragging(true);
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      className={styles.CanvasContainer}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
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
              stroke="black"
              strokeWidth={scaleSize * 0.8}
            />
          ))}
        </svg>

        {projects?.map((project, index) => (
          <Project
            key={project.id}
            project={project}
            updateLineCoordinates={updateLineCoordinates}
            index={index}
            ref={(el) => (projectRefs.current[index] = el)}
            isSpacebar={isSpacebar}
            scaleSize={scaleSize}
          />
        ))}
      </div>
    </div>
  );
}
