import React from 'react';
import { signup } from '@/app/signup/actions';
type signupButtonProps = {
  email: string;
  password: string;
};

export default function SignupButton({ email, password }: signupButtonProps) {
  const handleClick = async () => {};
  return <button>signupButton</button>;
}
