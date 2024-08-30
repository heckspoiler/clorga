'use client';

import React, { useState, useEffect } from 'react';
import { formStore } from '../../../../utils/formstore';
import AddTagField from './AddTagField';
import { Project } from '../../../../app/page';
import Plussign from '@/components/general/Plussign';

export default function TagField({
  styles,
  selectedProject,
  projects,
}: {
  styles: any;
  selectedProject: string;
  projects: Project[];
}) {
  const [newTag, setNewTag] = useState('');
  const [submitTagWindowIsOpen, setSubmitTagWindowIsOpen] = useState(false);
  const [activeTags, setActiveTags] = useState(new Set<string>());
  const [renderedTags, setRenderedTags] = useState<JSX.Element[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const selectedProjectTags =
      projects.find(
        (project) =>
          project.project_name?.toLowerCase() === selectedProject.toLowerCase()
      )?.project_tags || [];

    const newRenderedTags = selectedProjectTags.map(
      (tag: string, index: number) => (
        <p
          className={`${styles.Tag} ${
            activeTags.has(tag.toLowerCase()) ? styles.TagClicked : ''
          }`}
          key={index}
          data-value={`${tag.toLowerCase()}`}
          data-clickable="true"
          onClick={() => toggleTag(tag.toLowerCase())}
        >
          {`${tag.toLowerCase()}`}
        </p>
      )
    );

    setRenderedTags(newRenderedTags);
  }, [selectedProject, projects, activeTags, styles]); // Added activeTags to the dependency array

  return (
    <div className={styles.TagsContainer}>
      <div className={styles.FormCell}>
        <label htmlFor="tags">Tags:</label>
        <div className={styles.Tags}>
          <div
            className={styles.AddTag}
            onClick={() => setSubmitTagWindowIsOpen(!submitTagWindowIsOpen)}
          >
            <p>{submitTagWindowIsOpen ? 'close' : 'new tag'}</p>
            <div className={styles.SvgContainer}>
              <Plussign height={'15px'} width={'15px'} />
            </div>
          </div>
          {renderedTags}
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
          allTagsStore={[]}
          setAllTags={function (value: any): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
}
