import { createClient } from '@/utils/supabase/client';
import { sendEmail } from '@/utils/sendMail';

const URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PRODUCTION_URL
    : 'http://localhost:3000/';

export async function inviteUserToOrganization(
  email: string,
  organizationId: string,
  organizationName: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('invitations')
    .insert([
      {
        email,
        organization_id: organizationId,
        organization_name: organizationName,
      },
    ])
    .select();

  if (error) {
    console.error('Error inviting user:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const token = data[0].token;

    const invitationLink = `${URL}/accept-invite?token=${token}`;

    await sendEmail({
      to: email,
      subject: 'You have been invited to collaborate on CLORGA',
      html: `
        <h2>You have been invited</h2>
        <p>You have been invited to collaborate with ${organizationName} on clorga. Click the link below to accept the invite:</p>
        <p><a href="${invitationLink}">Accept the invite</a></p>
      `,
    });
  } else {
    console.error('No data returned from the insert operation');
  }
}
