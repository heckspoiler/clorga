import React from 'react';

export default function DateField({
  styles,
  newProject,
}: {
  styles: any;
  newProject: boolean;
}) {
  return (
    <div
      className={`${styles.FormCellDate} ${
        newProject ? styles.DateFieldIsVisible : ''
      }`}
    >
      <label htmlFor="idea-title">Date Due (optional):</label>
      <input id="idea-title" type="date" data-clickable="true" />
    </div>
  );
}
