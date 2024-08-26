'use client';

import React, { useEffect, useState } from 'react';
import { Idea } from '../InputFieldForm';

import { formStore } from '../../../../utils/formstore';
import AddTagField from './AddTagField';

export default function TagField({
  styles,
  ideas,
}: {
  styles: any;
  ideas: Idea[];
}) {
  const { allTagsStore } = formStore() as { allTagsStore: any };
  const { setAllTags } = formStore() as { setAllTags: any };

  // submitting a tag to the store

  const [newTag, setNewTag] = useState('');
  const [tagIsSubmitted, setTagIsSubmitted] = useState(false);
  const [submitTagWindowIsOpen, setSubmitTagWindowIsOpen] = useState(false);
  const [activeTags, setActiveTags] = useState(new Set());

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const newActiveTags = new Set(prev);
      if (newActiveTags.has(tag)) {
        newActiveTags.delete(tag);
      } else {
        newActiveTags.add(tag);
      }
      return newActiveTags;
    });
  };

  return (
    <div className={styles.TagsContainer}>
      <div className={styles.FormCell}>
        <label htmlFor="tags">Tags:</label>
        <div className={styles.Tags}>
          <div
            className={styles.AddTag}
            onClick={() => setSubmitTagWindowIsOpen(!submitTagWindowIsOpen)}
          >
            {submitTagWindowIsOpen ? 'close' : 'add tag'}
          </div>
          {allTagsStore.map((t: string, index: number) => (
            <p
              className={`${styles.Tag} ${
                activeTags.has(t.toLowerCase()) ? styles.TagClicked : ''
              }`}
              key={index}
              data-value={`${t.toLowerCase()}`}
              data-clickable="true"
              onClick={() => toggleTag(t.toLowerCase())}
            >
              {`${t.toLowerCase()}`}
            </p>
          ))}
        </div>
      </div>
      <div
        className={`${styles.SubmitField} ${
          submitTagWindowIsOpen ? styles.SubmitFieldVisible : ''
        }`}
      >
        <AddTagField
          state={submitTagWindowIsOpen}
          setState={setSubmitTagWindowIsOpen}
          styles={styles}
          newTag={newTag}
          setNewTag={setNewTag}
          tagIsSubmitted={tagIsSubmitted}
          setTagIsSubmitted={setTagIsSubmitted}
          setAllTags={setAllTags}
          allTagsStore={allTagsStore}
        />
      </div>
    </div>
  );
}
