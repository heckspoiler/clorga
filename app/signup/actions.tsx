'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

type SignupData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  token?: string;
};

export async function signup(data: SignupData) {
  const supabase = createClient();

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (signUpError) {
    console.error('Signup error:', signUpError);
    redirect('/error');
  }

  const userId = signUpData?.user?.id;

  if (userId) {
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: userId,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        address: data.address,
        email: data.email,
      },
    ]);

    if (insertError) {
      console.error('Error inserting user profile:', insertError);
      redirect('/error');
    }
  }

  revalidatePath('/');
  redirect('/subscribe');
}
