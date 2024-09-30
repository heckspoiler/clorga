import React from 'react';
import Formwrapper from './Formwrapper';
import styles from './Multistep.module.css';

export default function UserDetailForm() {
  return (
    <Formwrapper title={'Enter your Details'}>
      <div className={styles.FormRow}>
        <h5>First Name</h5>
        <input type="text" />
      </div>
      <div className={styles.FormRow}>
        <h5>Last Name</h5>
        <input type="text" />
      </div>
      <div className={styles.FormRow}>
        <h5>Email</h5>
        <input type="text" />
      </div>
      <div className={styles.FormRow}>
        <h5>Password</h5>
        <input type="password" />
      </div>
      <div className={styles.FormRow}>
        <h5>Confirm Password</h5>
        <input type="password" />
      </div>
    </Formwrapper>
  );
}
