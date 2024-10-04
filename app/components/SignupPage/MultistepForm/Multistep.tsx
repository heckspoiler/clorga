'use client';

import React, { FormEvent, useState } from 'react';
import styles from './Multistep.module.css';
import UserDetailForm from './UserDetailForm';
import { signup } from '@/app/signup/actions';
import GithubLogo from '../../general/GithubLogo';
import GoogleLogo from '../../general/GoogleLogo';
import AuthButtons from './AuthButtons';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  address: '',
};

export default function SignupForm() {
  const [data, setData] = useState<FormData>(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Perform client-side validation here if necessary
    const isValid = validateFields();
    if (!isValid) return;

    try {
      await signup(data); // Call signup function to create user
    } catch (error) {
      console.error('Signup error:', error);
    }
  }

  // Simple client-side validation logic (you can expand it as needed)
  const validateFields = () => {
    if (
      !data.email ||
      !data.password ||
      !data.firstName ||
      !data.lastName ||
      !data.phone ||
      !data.address
    ) {
      alert('Please fill out all required fields');
      return false;
    }
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    return true;
  };

  return (
    <div className={styles.Form}>
      <form onSubmit={handleSubmit}>
        <UserDetailForm {...data} updateFields={updateFields} />
        <div className={styles.ButtonContainer}>
          <button type="submit" className={styles.SubmitButton}>
            Sign Up
          </button>
          <p>or use</p>
          <AuthButtons />
        </div>
      </form>
    </div>
  );
}
