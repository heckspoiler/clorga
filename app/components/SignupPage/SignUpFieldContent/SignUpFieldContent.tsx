'use client';

import React, { useState } from 'react';
import styles from './Multistep.module.css';

type UserDetailData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
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
  phone,
  address,
  updateFields,
}: UserDetailDataProps) {
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const validateFields = () => {
    let formErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
    };
    let isValid = true;

    // Validate first name
    if (!firstName.trim()) {
      formErrors.firstName = 'First name is required';
      isValid = false;
    }

    // Validate last name
    if (!lastName.trim()) {
      formErrors.lastName = 'Last name is required';
      isValid = false;
    }

    // Validate email
    if (!email.trim()) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      formErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    // Validate confirm password
    if (confirmPassword !== password) {
      formErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Validate phone number
    if (!phone.trim()) {
      formErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      formErrors.phone = 'Enter a valid 10-digit phone number';
      isValid = false;
    }

    // Validate address
    if (!address.trim()) {
      formErrors.address = 'Address is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleBlur = () => {
    validateFields();
  };

  return (
    <>
      <div className={styles.SameLineContainer}>
        <div className={styles.FormRow}>
          <h5>First Name</h5>
          <input
            type="text"
            onChange={(e) => updateFields({ firstName: e.target.value })}
            onBlur={handleBlur}
            value={firstName}
            className={errors.firstName ? styles.ErrorInput : ''}
          />
          {errors.firstName && (
            <p className={styles.ErrorText}>{errors.firstName}</p>
          )}
        </div>
        <div className={styles.FormRow}>
          <h5>Last Name</h5>
          <input
            type="text"
            onChange={(e) => updateFields({ lastName: e.target.value })}
            onBlur={handleBlur}
            value={lastName}
            className={errors.lastName ? styles.ErrorInput : ''}
          />
          {errors.lastName && (
            <p className={styles.ErrorText}>{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className={styles.FormRow}>
        <h5>Email</h5>
        <input
          type="email"
          onChange={(e) => updateFields({ email: e.target.value })}
          onBlur={handleBlur}
          value={email}
          className={errors.email ? styles.ErrorInput : ''}
        />
        {errors.email && <p className={styles.ErrorText}>{errors.email}</p>}
      </div>

      <div className={styles.SameLineContainer}>
        <div className={styles.FormRow}>
          <h5>Phone</h5>
          <input
            type="text"
            onChange={(e) => updateFields({ phone: e.target.value })}
            onBlur={handleBlur}
            value={phone}
            className={errors.phone ? styles.ErrorInput : ''}
          />
          {errors.phone && <p className={styles.ErrorText}>{errors.phone}</p>}
        </div>
        <div className={styles.FormRow}>
          <h5>Address</h5>
          <input
            type="text"
            onChange={(e) => updateFields({ address: e.target.value })}
            onBlur={handleBlur}
            value={address}
            className={errors.address ? styles.ErrorInput : ''}
          />
          {errors.address && (
            <p className={styles.ErrorText}>{errors.address}</p>
          )}
        </div>
      </div>

      <div className={styles.SameLineContainer}>
        <div className={styles.FormRow}>
          <h5>Password</h5>
          <input
            type="password"
            onChange={(e) => updateFields({ password: e.target.value })}
            onBlur={handleBlur}
            value={password}
            className={errors.password ? styles.ErrorInput : ''}
          />
          {errors.password && (
            <p className={styles.ErrorText}>{errors.password}</p>
          )}
        </div>
        <div className={styles.FormRow}>
          <h5>Confirm Password</h5>
          <input
            type="password"
            onChange={(e) => updateFields({ confirmPassword: e.target.value })}
            onBlur={handleBlur}
            value={confirmPassword}
            className={errors.confirmPassword ? styles.ErrorInput : ''}
          />
          {errors.confirmPassword && (
            <p className={styles.ErrorText}>{errors.confirmPassword}</p>
          )}
        </div>
      </div>
    </>
  );
}
