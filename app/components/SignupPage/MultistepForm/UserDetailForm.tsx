import React from 'react';
import Formwrapper from './Formwrapper';
import styles from './Multistep.module.css';

type UserDetailData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type UserDetailDataProps = UserDetailData & {
  updateFields: (fields: Partial<UserDetailData>) => void;
};

export default function UserDetailForm({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  updateFields,
}: UserDetailDataProps) {
  return (
    <Formwrapper title={'Enter your Details'}>
      <div className={styles.FormRow}>
        <h5>First Name</h5>
        <input
          type="text"
          onChange={(e) => updateFields({ firstName: e.target.value })}
          value={firstName}
        />
      </div>
      <div className={styles.FormRow}>
        <h5>Last Name</h5>
        <input
          type="text"
          onChange={(e) => updateFields({ lastName: e.target.value })}
          value={lastName}
        />
      </div>
      <div className={styles.FormRow}>
        <h5>Email</h5>
        <input
          type="email"
          onChange={(e) => updateFields({ email: e.target.value })}
          value={email}
        />
      </div>
      <div className={styles.FormRow}>
        <h5>Password</h5>
        <input
          type="password"
          onChange={(e) => updateFields({ password: e.target.value })}
          value={password}
        />
      </div>
      <div className={styles.FormRow}>
        <h5>Confirm Password</h5>
        <input
          type="password"
          onChange={(e) => updateFields({ confirmPassword: e.target.value })}
          value={confirmPassword}
        />
      </div>
    </Formwrapper>
  );
}
