'use client';
// React Imports
import React, { useEffect, useRef, useState } from 'react';

// CSS
import styles from './InputField.module.css';

// GSAP
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import InputFieldForm from './InputFieldContent/InputFieldForm';
import { Idea } from './InputFieldContent/InputFieldForm';

gsap.registerPlugin(Draggable, useGSAP);

export default function InputField({ ideas }: { ideas: Idea[] }) {
  const draggableRef = useRef(null);
  const foldContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useGSAP(() => {
    Draggable.create(draggableRef.current, {
      type: 'x,y',
      edgeResistance: 0.5,
      bounds: window,
      inertia: true,
      autoScroll: 1,
      dragClickables: false,
      onClick: () => setIsDragging(false),
      onDragEnd: () => setIsDragging(false),
    });
  });

  return (
    <div ref={draggableRef} className={styles.Main}>
      <div className={styles.FoldArrowContainer}>
        <h4>{isClosed ? 'Feed me' : 'Ideabox'}</h4>
        <div
          className={styles.FoldArrow}
          onClick={() => setIsClosed(!isClosed)}
          data-clickable="true"
          style={{
            cursor: 'pointer',
            transform: isClosed ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        ></div>
      </div>
      <div
        className={`${styles.Container} ${
          isClosed ? styles.FormContainerClosed : ''
        }`}
        ref={foldContainerRef}
      >
        <div
          className={`${styles.FormContainer} ${
            isClosed ? styles.FormContainerClosed : ''
          }`}
        >
          <InputFieldForm ideas={ideas} />
        </div>
      </div>
    </div>
  );
}
