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
};

export async function signup(data: SignupData) {
  const supabase = createClient();

  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: data.email,
        password: data.password,
      }
    );

    if (signUpError) {
      console.error('Signup error:', JSON.stringify(signUpError, null, 2));

      console.log('name: ', signUpError.name);
      console.log('code: ', signUpError.code);

      return redirect('/error');
    }

    const userId = signUpData?.user?.id;
    if (!userId) {
      console.error('Signup error: User ID is undefined after signup.');

      return redirect('/error');
    }

    const { error: insertError } = await supabase.from('users').insert([
      {
        id: userId,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        address: data.address,
        email: data.email,
        has_access: false,
      },
    ]);

    if (insertError) {
      console.error(
        'Error inserting user profile:',
        JSON.stringify(insertError, null, 2)
      );
      return redirect('/error');
    }

    // Step 3: Revalidate and redirect if successful
    revalidatePath('/');
    redirect('/stripe');
  } catch (error) {
    console.error('Unexpected error:', JSON.stringify(error, null, 2));
    redirect('/error');
  }
}
