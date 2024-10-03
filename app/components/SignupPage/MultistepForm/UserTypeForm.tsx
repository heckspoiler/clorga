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
        <h5>
          Do you want to set up a team to collaborate with multiple users?
        </h5>
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

      <div className={styles.IsCompanyContainer}>
        <div
          className={`${styles.CoverContainer} ${
            isCompany ? styles.CoverContainerHidden : null
          }`}
        ></div>
        <div className={styles.FormRow}>
          <h5>What's your team's name?</h5>
          <input
            type="text"
            value={companyName}
            onChange={(e) => updateFields({ companyName: e.target.value })}
            required={isCompany ? true : false}
          />
        </div>
        <div className={styles.FormRow}>
          <h5>How many users will be collaborating?</h5>
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
          <p className={styles.ChangeLater}>you can change this later</p>
        </div>
      </div>
    </Formwrapper>
  );
}
