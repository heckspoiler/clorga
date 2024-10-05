import React from 'react';

import Pricing from '../components/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';

import styles from './page.module.css';

async function page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const email = data?.user?.email;

  return (
    <section className={styles.Main}>
      <Pricing email={email} />
    </section>
  );
}

export default page;
