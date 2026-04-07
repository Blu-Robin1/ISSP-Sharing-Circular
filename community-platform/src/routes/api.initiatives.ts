import { UserRole } from 'oa-shared';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { InitiativesServiceServer } from 'src/services/initiativesService.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { client, headers } = createSupabaseServerClient(request);

  try {
    const url = new URL(request.url);
    const status = (url.searchParams.get('status') as 'approved' | 'pending' | 'approved_and_pending' | 'all') ?? 'approved';

    if (status === 'all') {
      const { data: userData } = await client.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) {
        return Response.json({ error: 'Unauthorized' }, { headers, status: 401 });
      }
      const { data: profile } = await client
        .from('profiles')
        .select('roles')
        .eq('auth_id', userId)
        .limit(1)
        .maybeSingle();
      if (!profile?.roles?.includes(UserRole.ADMIN)) {
        return Response.json({ error: 'Forbidden' }, { headers, status: 403 });
      }
    }

    const initiatives = await new InitiativesServiceServer(client).list(status);
    return Response.json({ initiatives }, { headers });
  } catch (error) {
    console.error(error);
    return Response.json({ initiatives: [] }, { headers, status: 500 });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { client, headers } = createSupabaseServerClient(request);

  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { headers, status: 405 });
  }

  try {
    const body = await request.json();
    const { title, description, projectType, lat, lng } = body;

    let createdByProfileId: number | null = null;
    const claims = await client.auth.getClaims();
    if (claims.data?.claims) {
      const { data: profile } = await client
        .from('profiles')
        .select('id')
        .eq('auth_id', claims.data.claims.sub)
        .maybeSingle();
      createdByProfileId = profile?.id ?? null;
    }

    const initiative = await new InitiativesServiceServer(client).create({
      title: title ?? 'Untitled',
      description: description ?? '',
      projectType: projectType ?? 'other',
      lat: Number(lat) || 0,
      lng: Number(lng) || 0,
      createdByProfileId,
    });

    return Response.json({ initiative }, { headers });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to create initiative' }, { headers, status: 500 });
  }
};
