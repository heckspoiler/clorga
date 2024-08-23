'use client';

import React, { useState, useEffect } from 'react';
import styles from './InputFieldForm.module.css';
import creativeProjectTags from './tagsArray';
import randomProjectArray from './projectArray';

export default function InputFieldForm() {
  return (
    <form className={styles.Form}>
      <div className={styles.FormContainer}>
        <div className={styles.FormCell}>
          <label htmlFor="idea">Idea:</label>
          <input id="idea" type="text" placeholder="Enter Idea" />
        </div>
        <div className={styles.FormCell}>
          <label htmlFor="name">By:</label>
          <input id="name" type="text" placeholder="Enter Name" />
        </div>
        <div className={styles.TagsContainer}>
          <div className={styles.FormCell}>
            <label htmlFor="tags">Tags:</label>
            <div className={styles.Tags}>
              {creativeProjectTags.map((tag, index) => (
                <div
                  data-clickable="true"
                  key={index}
                  className={styles.Tag}
                  data-type={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.TagsContainer}>
          <div className={styles.FormCell}>
            <label htmlFor="project">Project:</label>
            <div className={styles.Tags}>
              {randomProjectArray.map((project, index) => (
                <div
                  data-clickable="true"
                  key={index}
                  className={styles.Project}
                  data-type={project}
                >
                  {project}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className={styles.Submit}>Submit</button>
      </div>
    </form>
  );
}
