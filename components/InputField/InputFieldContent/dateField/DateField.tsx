import React from 'react';

export default function DateField({ styles }: { styles: any }) {
  return (
    <div className={styles.FormCell}>
      <label htmlFor="idea-title">Date Due (optional):</label>
      <input id="idea-title" type="date" data-clickable="true" />
    </div>
  );
}
