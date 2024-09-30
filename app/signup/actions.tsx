'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

type SignupData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isCompany: boolean;
  companyName?: string;
  tier?: number;
};

export async function signup(data: SignupData) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        is_company: data.isCompany,
        company_name: data.companyName,
        tier: data.tier,
      },
    },
  });

  if (error) {
    console.error('Signup error:', error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
