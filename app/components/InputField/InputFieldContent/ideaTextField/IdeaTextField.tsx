'use client';

import React, { useEffect } from 'react';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

import { newProjectStore } from '@/utils/newProjectStore';

export default function IdeaTextField({ styles }: { styles: any }) {
  // zustand imports
  const { ideaDescription, setIdeaDescription } = newProjectStore();
  const { isSubmitted } = isSubmittedStore();

  useEffect(() => {
    if (isSubmitted) {
      setIdeaDescription('');
    }
  }, [isSubmitted, setIdeaDescription]);

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIdeaDescription(e.target.value);
  };

  return (
    <div className={styles.FormCell}>
      <label htmlFor="name">Elaborate:</label>
      <textarea
        id="idea-description"
        name="idea-description"
        placeholder="3D vito bing chasing etienne in mario kart"
        wrap="soft"
        aria-label="Idea description"
        data-clickable="true"
        value={ideaDescription}
        onChange={handleInputChange}
      ></textarea>
    </div>
  );
}
