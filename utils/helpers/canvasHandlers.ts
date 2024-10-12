// utils/canvasHandlers.ts
import { Dispatch, SetStateAction } from 'react';

// Types for position and event handling
type Position = { x: number; y: number };

// Mouse Down Handler
export const handleMouseDown = (
  e: React.MouseEvent<HTMLDivElement>,
  isPanning: boolean,
  setDragging: Dispatch<SetStateAction<boolean>>,
  setStartPosition: Dispatch<SetStateAction<Position>>,
  position: Position
) => {
  if (isPanning) {
    setDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }
};

// Mouse Move Handler
export const handleMouseMove = (
  e: React.MouseEvent<HTMLDivElement>,
  dragging: boolean,
  startPosition: Position,
  setPosition: Dispatch<SetStateAction<Position>>
) => {
  if (dragging) {
    setPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
  }
};

// Mouse Up Handler
export const handleMouseUp = (
  setDragging: Dispatch<SetStateAction<boolean>>
) => {
  setDragging(false);
};

// Wheel Handler for Zoom
export const handleWheel = (
  e: React.WheelEvent<HTMLDivElement>,
  enableZoom: boolean,
  scaleSize: number,
  setScaleSize: Dispatch<SetStateAction<number>>
) => {
  if (enableZoom) {
    e.preventDefault();
    setScaleSize(scaleSize + (e.deltaY < 0 ? 0.005 : -0.005));
  }
};
