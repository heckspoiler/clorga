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

  useEffect(() => {
    setAllTags(() => [...allTagsStore, newTag]);
  }, [tagIsSubmitted]);

  // filtering out duplicate tags and sorting them alphabetically

  const tagsUnjoined = ideas?.map((idea, index) => {
    return idea.tags;
  });

  const tags: string[] = ([] as string[])
    .concat(...tagsUnjoined)
    .sort()
    .filter((tag, index, array) => {
      return array.indexOf(tag) === index;
    });

  useEffect(() => {
    console.log(tags);
    allTagsStore.forEach((tag: string) => tags.push(tag));
    console.log(tags);
  }, [tagIsSubmitted]);

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
          {tags.map((t: string, index: number) => (
            <p
              className={styles.Tag}
              key={index}
              data-value={`${t.toLowerCase()}`}
              data-clickable="true"
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
        />
      </div>
    </div>
  );
}
