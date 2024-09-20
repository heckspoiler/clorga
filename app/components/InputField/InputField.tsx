'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import styles from './InputField.module.css';

// zustand imports
import { formStore } from '@/utils/formstore';
import { forminViewportStore } from '@/utils/formInViewportStore';

import { createClient } from '@supabase/supabase-js';

import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import InputFieldForm from './InputFieldContent/InputFieldForm';
import { Project } from '../../page';

gsap.registerPlugin(Draggable, useGSAP);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function InputField({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const draggableRef = useRef(null);
  const foldContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // zustand stores
  const { isInViewport, setIsInViewport, shouldComeBack } =
    forminViewportStore();
  const { allTagsStore, setAllTags } = formStore() as {
    allTagsStore: any;
    setAllTags: any;
  };

  // Memoize tags calculation to avoid unnecessary recalculations
  const tags = useMemo(() => {
    const tagsUnjoined =
      initialProjects?.flatMap((project) => project.project_tags) || [];
    return [...new Set(tagsUnjoined)].sort();
  }, [initialProjects]);

  // Update store only once when component mounts or when tags change
  useEffect(() => {
    if (JSON.stringify(allTagsStore) !== JSON.stringify(tags)) {
      setAllTags(tags);
    }
  }, [tags, allTagsStore, setAllTags]);

  // Checker if in Viewport or not

  const checkIfInViewport = useCallback(() => {
    if (draggableRef?.current && isClosed) {
      const rect = (
        draggableRef.current as HTMLElement
      ).getBoundingClientRect();
      const isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth;
      setIsInViewport(isVisible);
    }
  }, [setIsInViewport, isClosed]);

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
      onDrag: checkIfInViewport, // Check during drag
      onDragEnd: () => {
        setIsDragging(false);
        checkIfInViewport(); // Check after drag ends
      },
    });
  }, [checkIfInViewport]);

  useEffect(() => {
    if (shouldComeBack) {
      gsap.to(draggableRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        onComplete: () => {
          setIsClosed(false);
          setIsInViewport(true);
        },
      });
    }
  }, [shouldComeBack, setIsInViewport]);

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
          className={styles.FoldArrowDiv}
          onClick={() => setIsClosed(!isClosed)}
          data-clickable="true"
          style={{
            cursor: 'pointer',
            transform: isClosed ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        >
          <div className={styles.FoldArrow} />
        </div>
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
          <InputFieldForm projects={initialProjects} />
        </div>
      </div>
    </div>
  );
}
