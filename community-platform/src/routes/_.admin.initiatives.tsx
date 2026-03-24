import { ClientOnly } from 'remix-utils/client-only';
import Main from 'src/pages/common/Layout/Main';
import { AdminInitiativesPage } from 'src/pages/Maps/Admin/AdminInitiativesPage.client';

export async function loader() {
  return null;
}

export default function AdminInitiativesRoute() {
  return (
    <Main ignoreMaxWidth={true}>
      <ClientOnly fallback={<></>}>{() => <AdminInitiativesPage />}</ClientOnly>
    </Main>
  );
}
