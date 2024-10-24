'use client';

import React, { useState, useEffect } from 'react';

import { useOrganizationStore } from '@/utils/OrganizationStore';

export default function InviteUserForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const { organizationId, organizationName } = useOrganizationStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setStatus('Sending invite...');

      const response = await fetch('/api/send-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, organizationId, organizationName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setStatus(
          `Failed to send invite: ${errorData.error || 'Unknown error'}`
        );
      } else {
        const result = await response.json();
        setStatus(result.message);
      }
    } catch (error) {
      console.error('Error sending invite:', error);
      setStatus('Error sending invite.');
    }
  };

  return (
    <div>
      <h2>Invite a User to Collaborate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email to invite"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Invite</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
