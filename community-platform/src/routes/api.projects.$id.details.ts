import { UserRole } from 'oa-shared';
import type { LoaderFunctionArgs } from 'react-router';
import { createSupabaseServerClient } from 'src/repository/supabase.server';

type ProjectSupportRow = {
  id: string;
  type: string;
  display_name: string | null;
  email: string | null;
  payload: Record<string, unknown> | null;
  created_at: string;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { client, headers } = createSupabaseServerClient(request);
  const projectId = Number(params.id);

  if (!projectId) {
    return Response.json({ error: 'Invalid project id' }, { headers, status: 400 });
  }

  const claims = await client.auth.getClaims();

  if (!claims.data?.claims) {
    return Response.json({ error: 'Unauthorized' }, { headers, status: 401 });
  }

  const { data: profile, error: profileError } = await client
    .from('profiles')
    .select('roles')
    .eq('auth_id', claims.data.claims.sub)
    .limit(1)
    .maybeSingle();

  if (profileError) {
    console.error('Failed to load profile for project details route', profileError);
    return Response.json({ error: 'Failed to load profile' }, { headers, status: 500 });
  }

  if (!profile?.roles?.includes(UserRole.ADMIN)) {
    return Response.json({ error: 'Forbidden' }, { headers, status: 403 });
  }

  const [{ data: project, error: projectError }, { data: supportRows, error: supportError }] = await Promise.all([
    client.from('projects').select('*').eq('id', projectId).single(),
    client
      .from('project_supports')
      .select('id,type,display_name,email,payload,created_at')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false }),
  ]);

  if (projectError) {
    console.error('Failed to load project details', projectError);
    return Response.json({ error: 'Failed to load project' }, { headers, status: 500 });
  }

  if (supportError) {
    console.error('Failed to load project supporters/contributions', supportError);
    return Response.json({ error: 'Failed to load support activity' }, { headers, status: 500 });
  }

  const rows = (supportRows ?? []) as ProjectSupportRow[];

  const supporters = rows
    .filter((row) => row.type === 'add_my_name')
    .map((row) => {
      const payload = (row.payload ?? {}) as Record<string, unknown>;
      return {
        id: row.id,
        name: row.display_name ?? (payload.displayName as string) ?? (payload.name as string) ?? null,
        email: row.email ?? (payload.email as string) ?? null,
        postal_code: (payload.postalCode as string) ?? (payload.postal_code as string) ?? null,
        created_at: row.created_at,
      };
    });

  const contributions = rows
    .filter((row) => row.type !== 'add_my_name')
    .map((row) => ({
      id: row.id,
      type: row.type,
      payload: row.payload ?? null,
      created_at: row.created_at,
    }));

  return Response.json(
    {
      initiative: project,
      project,
      supporters,
      contributions,
    },
    { headers },
  );
}
