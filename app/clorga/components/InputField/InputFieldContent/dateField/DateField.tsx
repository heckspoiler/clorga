'use client';

import React, { useEffect } from 'react';

import { newProjectStore } from '@/utils/newProjectStore';
import { isSubmittedStore } from '@/utils/isSubmittedStore';

// helper imports
import { handleInputChange } from '@/utils/helpers/handleInputChange';
import { useResetOnSubmit } from '@/utils/helpers/fieldReset';

// component starts here

export default function DateField({
  styles,
  newProject,
}: {
  styles: any;
  newProject: boolean;
}) {
  //zustand store
  const { projectDueDate, setProjectDueDate } = newProjectStore();
  const { isSubmitted } = isSubmittedStore();

  useResetOnSubmit(isSubmitted, () => setProjectDueDate(''), []);

  return (
    <div
      className={`${styles.FormCellDate} ${
        newProject ? styles.DateFieldIsVisible : ''
      }`}
    >
      <label htmlFor="idea-title">Date Due (optional):</label>
      <input
        id="idea-title"
        type="date"
        data-clickable="true"
        onChange={(e) => handleInputChange(e, setProjectDueDate)}
        value={projectDueDate.toString()}
      />
    </div>
  );
}
