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
    const { name, email, postalCode } = body;

    let profileId: number | null = null;
    const claims = await client.auth.getClaims();
    if (claims.data?.claims) {
      const { data: profile } = await client
        .from('profiles')
        .select('id')
        .eq('auth_id', claims.data.claims.sub)
        .limit(1);
      profileId = profile?.at(0)?.id ?? null;
    }

    await new InitiativesServiceServer(client).addSupport(id, {
      name: name?.trim(),
      email: email?.trim(),
      postalCode: postalCode?.trim(),
      profileId,
    });

    return Response.json({ success: true }, { headers });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to add support' }, { headers, status: 500 });
  }
};
