import React from 'react';

export default function IdeaTextField({ styles }: { styles: any }) {
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
      ></textarea>
    </div>
  );
}
