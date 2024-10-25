import React from 'react';
import { signUpAction } from '@/app/actions';

type signupButtonProps = {
  email: string;
  password: string;
};

export default function SignupButton({ email, password }: signupButtonProps) {
  const handleClick = async () => {};
  return <button>signupButton</button>;
}
