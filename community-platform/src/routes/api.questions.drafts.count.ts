import type { LoaderFunctionArgs } from 'react-router';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { contentServiceServer } from 'src/services/contentService.server';
import { ProfileServiceServer } from 'src/services/profileService.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { client, headers } = createSupabaseServerClient(request);

  const claims = await client.auth.getClaims();

  if (!claims.data?.claims) {
    return Response.json({}, { headers, status: 401 });
  }

  const { data: userData, error: getUserError } = await client.auth.getUser();
  if (getUserError) {
    console.error('Failed to fetch user from auth for questions drafts count', getUserError);
  }

  if (userData?.user) {
    await new ProfileServiceServer(client).ensureProfile(userData.user);
  }

  const profileService = new ProfileServiceServer(client);
  const profile = await profileService.getByAuthId(claims.data.claims.sub);

  if (!profile) {
    return Response.json({}, { headers, status: 400, statusText: 'invalid user' });
  }

  const count = await contentServiceServer.getDraftCount(client, profile.id, 'questions');

  return Response.json({ total: count }, { headers });
};
