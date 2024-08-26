'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './InputField.module.css';
import { formStore } from '@/utils/formstore';
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

  const { allTagsStore, setAllTags } = formStore() as {
    allTagsStore: any;
    setAllTags: any;
  };

  // Memoize tags calculation to avoid unnecessary recalculations
  const tags = useMemo(() => {
    const tagsUnjoined = ideas?.flatMap((idea) => idea.tags) || [];
    return [...new Set(tagsUnjoined)].sort();
  }, [ideas]);

  // Update store only once when component mounts or when tags change
  useEffect(() => {
    if (JSON.stringify(allTagsStore) !== JSON.stringify(tags)) {
      setAllTags(tags);
    }
  }, [tags, allTagsStore, setAllTags]);

  // Draggable setup
  useGSAP(() => {
    Draggable.create(draggableRef.current, {
      type: 'x,y',
      edgeResistance: 0,
      zIndexBoost: true,
      inertia: true,
      autoScroll: 1,
      dragClickables: false,
      onDragStart: () => setIsDragging(true),
      onDragEnd: () => setIsDragging(false),
    });
  }, []);

  return (
    <div
      ref={draggableRef}
      className={`${styles.Main} ${isDragging ? styles.isDragging : ''}`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
    >
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
        />
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
