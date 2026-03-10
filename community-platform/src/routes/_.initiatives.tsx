import { Outlet } from 'react-router';
import Main from 'src/pages/common/Layout/Main';

export async function loader() {
  return null;
}

export default function InitiativesLayout() {
  return (
    <Main sx={{ flex: 1 }}>
      <Outlet />
    </Main>
  );
}
