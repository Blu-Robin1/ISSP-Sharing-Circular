import { UserRole } from 'oa-shared';
import type { LoaderFunctionArgs } from 'react-router';
import { redirect } from 'react-router';
import { ClientOnly } from 'remix-utils/client-only';
import Main from 'src/pages/common/Layout/Main';
import { AdminInitiativesPage } from 'src/pages/Maps/Admin/AdminInitiativesPage.client';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { redirectServiceServer } from 'src/services/redirectService.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, headers } = createSupabaseServerClient(request);

  const { data: userData } = await client.auth.getUser();
  const userId = userData?.user?.id;

  if (!userId) {
    return redirectServiceServer.redirectSignIn('/admin/initiatives', headers);
  }

  const { data: profile } = await client
    .from('profiles')
    .select('id,roles')
    .eq('auth_id', userId)
    .limit(1)
    .maybeSingle();

  if (!profile?.roles?.includes(UserRole.ADMIN)) {
    return redirect('/forbidden?page=admin-initiatives', { headers });
  }

  return null;
}

export default function AdminInitiativesRoute() {
  return (
    <Main ignoreMaxWidth={true}>
      <ClientOnly fallback={<></>}>{() => <AdminInitiativesPage />}</ClientOnly>
    </Main>
  );
}
