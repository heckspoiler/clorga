'use client';

import React from 'react';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

import { newProjectStore } from '@/utils/newProjectStore';

// helper imports

import { handleInputChange } from '@/utils/helpers/handleInputChange';
import { useResetOnSubmit } from '@/utils/helpers/fieldReset';
import CellContainer from '../../CellContainer/CellContainer';

export default function IdeaTextField({ styles }: { styles: any }) {
  // zustand stores
  const { ideaDescription, setIdeaDescription } = newProjectStore();
  const { isSubmitted } = isSubmittedStore();

  useResetOnSubmit(isSubmitted, () => setIdeaDescription(''), []);

  return (
    <CellContainer>
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
    </CellContainer>
  );
}
