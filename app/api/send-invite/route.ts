// app/api/send-invite/route.ts (API route)
import { NextResponse } from 'next/server';
import { inviteUserToOrganization } from '@/utils/inviteUserToOrganization';

export async function POST(request: Request) {
  try {
    const { email, organizationId, organizationName } = await request.json();

    if (!email || !organizationId || !organizationName) {
      return NextResponse.json(
        { error: 'Missing email or organizationId' },
        { status: 400 }
      );
    }

    // Call the server-side function with the data from the client
    await inviteUserToOrganization(email, organizationId, organizationName);

    return NextResponse.json(
      { message: 'Invitation sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending invite:', error);
    return NextResponse.json(
      { error: 'Failed to send invite' },
      { status: 500 }
    );
  }
}
