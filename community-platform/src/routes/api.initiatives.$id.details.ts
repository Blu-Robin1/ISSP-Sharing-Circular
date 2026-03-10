import { UserRole } from 'oa-shared';
import type { LoaderFunctionArgs } from 'react-router';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { InitiativesServiceServer } from 'src/services/initiativesService.server';

/** Admin-only: returns initiative with supporters and contributions */
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { client, headers } = createSupabaseServerClient(request);
  const id = params.id;

  if (!id) {
    return Response.json({ error: 'Missing id' }, { headers, status: 400 });
  }

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

  try {
    const svc = new InitiativesServiceServer(client);
    const [initiative, supporters, contributions] = await Promise.all([
      svc.getById(id),
      svc.listSupporters(id),
      svc.listContributions(id),
    ]);

    if (!initiative) {
      return Response.json({ error: 'Not found' }, { headers, status: 404 });
    }

    return Response.json(
      { initiative, supporters, contributions },
      { headers },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to fetch' }, { headers, status: 500 });
  }
};
