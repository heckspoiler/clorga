import React from 'react';
import { Idea } from '../InputFieldForm';

export default function TagField({
  styles,
  ideas,
}: {
  styles: any;
  ideas: Idea[];
}) {
  const tagsUnjoined = ideas?.map((idea, index) => {
    return idea.tags;
  });

  const tags: string[] = ([] as string[])
    .concat(...tagsUnjoined)
    .sort()
    .filter((tag, index, array) => {
      return array.indexOf(tag) === index;
    });

  return (
    <div className={styles.TagsContainer}>
      <div className={styles.FormCell}>
        <label htmlFor="tags">Tags:</label>
        <div className={styles.Tags}>
          {tags.map((t, index) => (
            <p
              className={styles.Tag}
              key={index}
              data-value={`${t.toLowerCase()}`}
            >
              {`${t.toLowerCase()}`}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
