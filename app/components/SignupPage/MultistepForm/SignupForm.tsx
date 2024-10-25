import React, { FormEvent, useState, useEffect } from 'react';
import styles from './Multistep.module.css';
import UserDetailForm from './UserDetailForm';
import { signup } from '@/app/signup/actions';
import AuthButtons from './AuthButtons';
import Formwrapper from './Formwrapper';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  token?: string;
  givenEmail?: string;
};

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  address: '',
  token: '',
};

export default function SignupForm({
  email,
  token,
  title,
  organizationName,
}: {
  email?: string;
  token?: string;
  title?: string;
  organizationName?: string;
}) {
  const [data, setData] = useState<FormData>({
    ...INITIAL_DATA,
    email: email || '',
    token: token || '',
  });

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const isValid = validateFields();
    if (!isValid) return;

    try {
      await signup(data);
    } catch (error) {
      console.error('Signup error:', error);
    }
  }

  // Simple client-side validation logic
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
        <Formwrapper title={title ? title : 'Subscribe to Clorga'}>
          <UserDetailForm {...data} updateFields={updateFields} />
        </Formwrapper>
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
