import { UserRole } from 'oa-shared';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { InitiativesServiceServer } from 'src/services/initiativesService.server';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { client, headers } = createSupabaseServerClient(request);
  const id = params.id;

  if (!id) {
    return Response.json({ error: 'Missing id' }, { headers, status: 400 });
  }

  try {
    const initiative = await new InitiativesServiceServer(client).getById(id);
    if (!initiative) {
      return Response.json({ error: 'Not found' }, { headers, status: 404 });
    }
    return Response.json({ initiative }, { headers });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to fetch' }, { headers, status: 500 });
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { client, headers } = createSupabaseServerClient(request);
  const id = params.id;

  if (!id) {
    return Response.json({ error: 'Missing id' }, { headers, status: 400 });
  }

  const claims = await client.auth.getClaims();
  if (!claims.data?.claims) {
    return Response.json({ error: 'Unauthorized' }, { headers, status: 401 });
  }

  const { data: profile } = await client
    .from('profiles')
    .select('id,roles')
    .eq('auth_id', claims.data.claims.sub)
    .limit(1);

  const isAdmin = profile?.at(0)?.roles?.includes(UserRole.ADMIN);

  if (request.method === 'DELETE') {
    if (!isAdmin) {
      return Response.json({ error: 'Forbidden' }, { headers, status: 403 });
    }
    const ok = await new InitiativesServiceServer(client).delete(id);
    return Response.json({ success: ok }, { headers });
  }

  if (request.method === 'PATCH') {
    if (!isAdmin) {
      return Response.json({ error: 'Forbidden' }, { headers, status: 403 });
    }

    const body = await request.json();
    const initiative = await new InitiativesServiceServer(client).update(id, {
      title: body.title,
      description: body.description,
      projectType: body.projectType,
      status: body.status,
      stageOverride: body.stageOverride ?? null,
      stage3Milestones: body.stage3Milestones ?? null,
    });

    if (!initiative) {
      return Response.json({ error: 'Not found' }, { headers, status: 404 });
    }
    return Response.json({ initiative }, { headers });
  }

  return Response.json({ error: 'Method not allowed' }, { headers, status: 405 });
};
