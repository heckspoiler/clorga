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
import { Project } from '../../../page';

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
  const draggableRef = useRef<HTMLDivElement>(null);
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
        rect.top >= -rect.height &&
        rect.left >= -rect.width &&
        rect.bottom <= window.innerHeight + rect.height &&
        rect.right <= window.innerWidth + rect.width;
      setIsInViewport(isVisible);
    }
  }, [setIsInViewport, isClosed]);

  // Draggable setup
  useGSAP(() => {
    const draggableElement = draggableRef.current;

    Draggable.create(draggableElement, {
      type: 'x,y',
      edgeResistance: 0,
      zIndex: 1,
      inertia: true,
      autoScroll: 1,
      dragClickables: false,
      onDragStart: () => {
        setIsDragging(true);
        if (draggableElement) {
          draggableElement.style.zIndex = '10';
        }
      },
      onDrag: checkIfInViewport,
      onDragEnd: () => {
        setIsDragging(false);
        if (draggableElement) {
          draggableElement.style.zIndex = '1';
        }
        checkIfInViewport();
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
            transform: isClosed ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <div className={styles.FoldArrow} />
        </div>
      </div>
      <div>
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
    </div>
  );
}
