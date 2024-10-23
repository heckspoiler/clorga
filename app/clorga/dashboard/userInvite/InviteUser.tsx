import React, { useState } from 'react';

export default function InviteUserForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setStatus('Sending invite...');

      const response = await fetch('/api/send-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, organizationId: 'your-organization-id' }), // Replace with actual org ID
      });

      // Parse response as JSON
      if (!response.ok) {
        const errorData = await response.json();
        setStatus(
          `Failed to send invite: ${errorData.error || 'Unknown error'}`
        );
      } else {
        const result = await response.json(); // Parse JSON only if the response is valid
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
