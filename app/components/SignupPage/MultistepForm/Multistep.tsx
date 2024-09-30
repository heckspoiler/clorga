'use client';

import React from 'react';
import styles from './Multistep.module.css';
import useMultistepForm from './useMultistepForm';
import UserTypeForm from './UserTypeForm';
import UserDetailForm from './UserDetailForm';

export default function Multistep() {
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([<UserTypeForm />, <UserDetailForm />]);
  return (
    <div className={styles.Form}>
      <form>
        <div className={styles.StepContainer}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
      </form>
      <div className={styles.ButtonContainer}>
        <button
          type="button"
          onClick={back}
          className={`${isFirstStep ? styles.ButtonDisabled : ''}`}
        >
          Back
        </button>
        <button type="button" onClick={next}>
          {!isLastStep ? 'Next' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
}
