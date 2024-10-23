import { createClient } from '@/utils/supabase/client';
import { useOrganizationStore } from '@/utils/OrganizationStore';
import { userStore } from '@/utils/userStore';
import { sendEmail } from '@/utils/sendMail';

export async function inviteUserToOrganization(email: string) {
  const supabase = createClient();
  const { organizationId } = useOrganizationStore();

  if (!organizationId) {
    console.error('Organization ID not found');
    return;
  }

  const name = userStore((state) => state.firstName); // Fetching the user's first name

  const { data, error } = await supabase
    .from('invitations')
    .insert([{ email, organization_id: organizationId }])
    .select(); // Add .select() to return the inserted row

  if (error) {
    console.error('Error inviting user:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const token = data[0].token; // Get the token from the inserted row

    const invitationLink = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/accept-invite?token=${token}`;

    await sendEmail({
      to: email,
      subject: 'You have been invited to collaborate on CLORGA',
      html: `
        <h2>You have been invited</h2>
        <p>You have been invited to collaborate with ${name}. Click the link below to accept the invite:</p>
        <p><a href="${invitationLink}">Accept the invite</a></p>
      `,
    });
  } else {
    console.error('No data returned from the insert operation');
  }
}
