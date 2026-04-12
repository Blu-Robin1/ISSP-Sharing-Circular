import type { LoaderFunctionArgs } from 'react-router';
import { redirect } from 'react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  const headers = new Headers();
  return redirect('/admin/initiatives', { headers });
}

export default function AdminProjectsRoute() {
  return null;
}
