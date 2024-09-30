'use client';

import React, { useState } from 'react';
import styles from './Multistep.module.css';
import Formwrapper from './Formwrapper';

export default function UserTypeForm() {
  const [isCompany, setIsCompany] = useState(false);
  const [tier, setTier] = useState(null);

  const handleCompanyClick = (value: any) => {
    setIsCompany(value);
  };

  const handleTierClick = (value: any) => {
    setTier(value);
  };

  return (
    <Formwrapper title={'Hello there!'}>
      <div className={styles.FormRow}>
        <h5>Are you an organization?</h5>
        <div className={styles.ButtonContainerFirst}>
          <button
            type="button"
            onClick={() => handleCompanyClick(true)}
            className={isCompany === true ? styles.active : ''}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleCompanyClick(false)}
            className={isCompany === false ? styles.active : ''}
          >
            No
          </button>
        </div>
      </div>

      {isCompany && (
        <>
          {' '}
          <div className={styles.FormRow}>
            <h5>What's your companie's name?</h5>
            <input type="text" />
          </div>
          <div className={styles.FormRow}>
            <h5>How many users will be registered?</h5>
            <div className={styles.ButtonContainerFirst}>
              <button
                type="button"
                onClick={() => handleTierClick(1)}
                className={tier === 1 ? styles.active : ''}
              >
                2-5
              </button>
              <button
                type="button"
                onClick={() => handleTierClick(2)}
                className={tier === 2 ? styles.active : ''}
              >
                6-10
              </button>
              <button
                type="button"
                onClick={() => handleTierClick(3)}
                className={tier === 3 ? styles.active : ''}
              >
                10+
              </button>
            </div>
          </div>
        </>
      )}
    </Formwrapper>
  );
}
