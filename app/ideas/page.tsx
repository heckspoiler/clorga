import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';

export const metadata = {
  title: 'OZELOT CLORGA | IDEAS',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

export default async function Ideas() {
  const supabase = createClient();
  const { data: projects } = await supabase.from('projects').select('*');

  console.log(projects);

  return <pre>{JSON.stringify(projects, null, 2)}</pre>;
}
