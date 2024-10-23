import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendMail';

export async function POST(request: Request) {
  try {
    const { email, organizationId } = await request.json();

    if (!email || !organizationId) {
      return NextResponse.json(
        { error: 'Missing email or organizationId' },
        { status: 400 }
      );
    }

    // Call the email-sending logic
    await sendEmail({
      to: email,
      subject: 'You have been invited to collaborate on CLORGA',
      html: `<h2>You have been invited</h2>
             <p>Click the link below to accept the invite:</p>
             <p><a href="https://your-site.com/accept-invite">Accept Invite</a></p>`,
    });

    // Always return a JSON response
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
