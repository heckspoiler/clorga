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
import { projectStore } from '@/utils/projectstore';

import { createClient } from '@supabase/supabase-js';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

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
  const { isSubmitted, setIsSubmitted } = isSubmittedStore();
  const { projectsStore, setProjects } = projectStore() as {
    projectsStore: any;
    setProjects: any;
  };

  const fetchProjects = useCallback(async () => {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) console.log('error', error);
    else setProjects(data);
  }, [supabase]);

  useEffect(() => {
    fetchProjects();

    const channel = supabase
      .channel('public:projects')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        (payload) => {
          console.log('Change received!', payload);
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [fetchProjects, isSubmitted]);

  useEffect(() => {
    if (JSON.stringify(projectsStore) !== JSON.stringify(initialProjects)) {
      setProjects(initialProjects);
    }
  }, [initialProjects, projectsStore, setProjects]);

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
          <InputFieldForm projects={initialProjects} />
        </div>
      </div>
    </div>
  );
}
