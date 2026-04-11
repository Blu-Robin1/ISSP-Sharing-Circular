import { redirect } from 'react-router';

export async function loader() {
  return redirect('/library');
}

export default function Index() {
  return <></>;
}
