import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import ClientDashboard from './ClientDashboard';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
    return null;
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*');

  if (userError || !userData?.[0]) {
    redirect('/login');
    return null;
  }

  console.log(userData);

  const user = userData[0];

  return (
    <div>
      <ClientDashboard user={user} />
    </div>
  );
}
