'use client';

import React, { useState } from 'react';
import SignupButton from '../signupButton/signupButton';
import styles from './AcceptInviteForm.module.css';
import SignupField from '@/app/components/SignupPage/SignupField';

type AcceptInviteFormProps = {
  email: string;
  organizationName?: string;
  token: string;
};

export default function AcceptInviteForm({
  email: email,
  organizationName,
  token,
}: AcceptInviteFormProps) {
  const password = '';
  return (
    <section className={styles.Main}>
      <SignupField
        email={email}
        token={token}
        organizationName={organizationName}
        title={`Collaborate with ${organizationName}`}
      />
    </section>
  );
}
