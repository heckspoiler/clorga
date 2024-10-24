'use client';

import React from 'react';

import { useOrganizationStore } from '@/utils/OrganizationStore';
import AcceptInviteContent from './AcceptInviteContent';

export default function page() {
  return (
    <div>
      <AcceptInviteContent />
    </div>
  );
}
