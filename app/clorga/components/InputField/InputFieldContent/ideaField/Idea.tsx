'use client';

import React, { useEffect, useState } from 'react';
import { newProjectStore } from '@/utils/newProjectStore';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

// helper imports
import { handleInputChange } from '@/utils/helpers/handleInputChange';
import { useResetOnSubmit } from '@/utils/helpers/fieldReset';

export default function Idea({ styles }: { styles: any }) {
  // Zustand Store
  const { ideaTitle, setIdeaTitle } = newProjectStore();
  const { isSubmitted } = isSubmittedStore();

  useEffect(() => {
    if (isSubmitted) {
      setIdeaTitle('');
    }
  }, [isSubmitted, setIdeaTitle]);

  useResetOnSubmit(isSubmitted, () => setIdeaTitle(''), []);

  return (
    <div className={styles.FormCell}>
      <label htmlFor="idea">Idea Title:</label>
      <input
        id="idea"
        type="text"
        value={ideaTitle}
        onChange={(e) => handleInputChange(e, setIdeaTitle)}
        placeholder="Enter Idea"
        data-clickable="true"
      />
    </div>
  );
}
