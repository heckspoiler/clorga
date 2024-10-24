'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function AcceptInviteContent() {
  const [inviteData, setInviteData] = useState(null);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const fetchInvite = async () => {
      if (token) {
        const supabase = createClient();

        const { data: inviteData, error: inviteError } = await supabase
          .from('invitations')
          .select('*')
          .eq('token', token);

        if (inviteError) {
          setError('Error fetching invite data.');
        } else if (inviteData?.length > 0) {
          const invite = inviteData[0];
          setInviteData(invite);
          setEmail(invite.email);

          const { data: organizationData, error: orgError } = await supabase
            .from('organizations')
            .select('name')
            .eq('id', invite.organization_id)
            .single();

          if (orgError) {
            setError('Error fetching organization name.');
          } else {
            setOrganizationName(
              organizationData?.name || 'Unknown Organization'
            );
          }
        }
      }
    };

    fetchInvite();
  }, [token]);

  if (!token) {
    return <div>Invalid or missing token.</div>;
  }

  return (
    <div style={{ paddingTop: '8rem' }}>
      {error ? (
        <p>{error}</p>
      ) : inviteData ? (
        <div>
          <h2>
            You've been invited to work with {organizationName} on Clorga!
          </h2>
          <p>Email: {email}</p>
          <p>Organization: {organizationName}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
