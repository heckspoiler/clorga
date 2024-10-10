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

import { createClient } from '@supabase/supabase-js';

import InputFieldForm from './InputFieldContent/InputFieldForm';
import type { Project } from '../../page';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function InputField({
  initialProjects,
  isVisible,
}: {
  initialProjects: Project[];
  isVisible: boolean;
}) {
  const { allTagsStore, setAllTags } = formStore() as {
    allTagsStore: any;
    setAllTags: any;
  };

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

  return (
    <div className={`${styles.Main} ${isVisible ? styles.IsVisible : ''}`}>
      <InputFieldForm projects={initialProjects} />
    </div>
  );
}
