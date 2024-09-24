'use client';

import React, { useEffect } from 'react';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

import { newProjectStore } from '@/utils/newProjectStore';

// helper imports

import { handleInputChange } from '@/utils/helpers/handleInputChange';

export default function IdeaTextField({ styles }: { styles: any }) {
  // zustand stores
  const { ideaDescription, setIdeaDescription } = newProjectStore();
  const { isSubmitted } = isSubmittedStore();

  useEffect(() => {
    if (isSubmitted) {
      setIdeaDescription('');
    }
  }, [isSubmitted, setIdeaDescription]);

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
        onChange={(e) => handleInputChange(e, setIdeaDescription)}
      ></textarea>
    </div>
  );
}
