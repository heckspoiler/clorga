'use client';

import React, { useState } from 'react';
import styles from './Multistep.module.css';
import Formwrapper from './Formwrapper';

type CompanyData = {
  isCompany: boolean;
  tier?: number;
  companyName?: string;
};

type CompanyDataProps = CompanyData & {
  updateFields: (fields: Partial<CompanyData>) => void;
};

export default function UserTypeForm({
  isCompany,
  tier,
  companyName,
  updateFields,
}: CompanyDataProps) {
  return (
    <Formwrapper title={'Hello there!'}>
      <div className={styles.FormRow}>
        <h5>Are you an organization?</h5>
        <div className={styles.ButtonContainerFirst}>
          <div
            onClick={(e) => updateFields({ isCompany: true })}
            className={isCompany === true ? styles.active : ''}
          >
            Yes
          </div>
          <div
            onClick={(e) => updateFields({ isCompany: false })}
            className={isCompany === false ? styles.active : ''}
          >
            No
          </div>
        </div>
      </div>

      {isCompany && (
        <>
          {' '}
          <div className={styles.FormRow}>
            <h5>What's your companie's name?</h5>
            <input
              type="text"
              value={companyName}
              onChange={(e) => updateFields({ companyName: e.target.value })}
            />
          </div>
          <div className={styles.FormRow}>
            <h5>How many users will be registered?</h5>
            <div className={styles.ButtonContainerFirst}>
              <div
                onClick={(e) => updateFields({ tier: 1 })}
                className={tier === 1 ? styles.active : ''}
              >
                2-5
              </div>
              <div
                onClick={(e) => updateFields({ tier: 2 })}
                className={tier === 2 ? styles.active : ''}
              >
                6-10
              </div>
              <div
                onClick={(e) => updateFields({ tier: 3 })}
                className={tier === 3 ? styles.active : ''}
              >
                10+
              </div>
            </div>
          </div>
        </>
      )}
    </Formwrapper>
  );
}
