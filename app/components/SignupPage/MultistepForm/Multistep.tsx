'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import styles from './Multistep.module.css';
import useMultistepForm from './useMultistepForm';
import UserTypeForm from './UserTypeForm';
import UserDetailForm from './UserDetailForm';
import { signup } from '@/app/signup/actions';

type FormData = {
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isCompany: boolean;
  companyName?: string;
  tier?: number;
};

const INITIAL_DATA: FormData = {
  userType: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isCompany: false,
  companyName: '',
  tier: 0,
};

export default function Multistep() {
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserTypeForm {...data} updateFields={updateFields} />,
      <UserDetailForm {...data} updateFields={updateFields} />,
    ]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLastStep) {
      try {
        console.log('Signup data:', data);
        await signup(data);
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  }

  useEffect(() => {
    !data.isCompany ? updateFields({ tier: 0 }) : null;
  }, [data.isCompany]);

  function handleNext(e: React.MouseEvent) {
    e.preventDefault();
    next();
  }

  function handleBack(e: React.MouseEvent) {
    e.preventDefault();
    back();
  }
  return (
    <div className={styles.Form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.StepContainer}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
      </form>
      <div className={styles.ButtonContainer}>
        <button
          type="button"
          onClick={handleBack}
          className={`${isFirstStep ? styles.ButtonDisabled : ''}`}
        >
          Back
        </button>
        {!isLastStep ? (
          <button type="button" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button type="button" onClick={handleSubmit}>
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
}
