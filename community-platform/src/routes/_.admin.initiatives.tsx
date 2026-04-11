import { UserRole } from 'oa-shared';
import type { LoaderFunctionArgs } from 'react-router';
import { redirect } from 'react-router';
import Main from 'src/pages/common/Layout/Main';
import { AdminProjectsPage } from 'src/pages/Maps/Admin/AdminInitiativesPage.client';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { redirectServiceServer } from 'src/services/redirectService.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, headers } = createSupabaseServerClient(request);
  const claims = await client.auth.getClaims();

  if (!claims.data?.claims) {
    return redirectServiceServer.redirectSignIn('/admin/initiatives', headers);
  }

  const { data, error } = await client
    .from('profiles')
    .select('id,roles')
    .eq('auth_id', claims.data.claims.sub)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Failed to load profile for admin projects route', error);
    return redirect('/forbidden?page=admin-projects', { headers });
  }

  if (!data?.roles?.includes(UserRole.ADMIN)) {
    return redirect('/forbidden?page=admin-projects', { headers });
  }

  return null;
}

export default function AdminInitiativesRoute() {
  return (
    <Main style={{ flex: 1 }}>
      <AdminProjectsPage />
    </Main>
  );
}
