import type { ActionFunctionArgs } from 'react-router';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { InitiativesServiceServer } from 'src/services/initiativesService.server';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { client, headers } = createSupabaseServerClient(request);
  const id = params.id;

  if (!id || request.method !== 'POST') {
    return Response.json({ error: 'Bad request' }, { headers, status: 400 });
  }

  try {
    const body = await request.json();
    const { type, payload } = body;

    if (!type || !['volunteer_skills', 'pledge_membership', 'donate', 'champion'].includes(type)) {
      return Response.json({ error: 'Invalid type' }, { headers, status: 400 });
    }

    let profileId: number | null = null;
    let userEmail: string | undefined;
    const { data: userData } = await client.auth.getUser();
    const userId = userData?.user?.id;
    if (userId) {
      userEmail = userData?.user?.email ?? undefined;
      const { data: profile } = await client
        .from('profiles')
        .select('id')
        .eq('auth_id', userId)
        .limit(1);
      profileId = profile?.at(0)?.id ?? null;
    }

    const mergedPayload = { ...(payload ?? {}) };
    if (userEmail && (type === 'pledge_membership' || type === 'champion') && !mergedPayload.email) {
      mergedPayload.email = userEmail;
    }

    await new InitiativesServiceServer(client).addContribution(id, {
      type,
      profileId,
      payload: mergedPayload,
    });

    return Response.json({ success: true }, { headers });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to add contribution' }, { headers, status: 500 });
  }
};
