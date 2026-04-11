import type { UserCreatedDocs } from 'oa-shared';
import { UserRole } from 'oa-shared';
import type { LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';
import { redirect } from 'react-router';
import Main from 'src/pages/common/Layout/Main';
import { OrganizerDashboard } from 'src/pages/OrganizerDashboard/OrganizerDashboard';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { libraryServiceServer } from 'src/services/libraryService.server';
import { ProfileFactory } from 'src/factories/profileFactory.server';
import { ProfileServiceServer } from 'src/services/profileService.server';
import { questionServiceServer } from 'src/services/questionService.server';
import { researchServiceServer } from 'src/services/researchService.server';
import { redirectServiceServer } from 'src/services/redirectService.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const { client, headers } = createSupabaseServerClient(request);
  const claims = await client.auth.getClaims();

  if (!claims.data?.claims) {
    return redirectServiceServer.redirectSignIn('/organizer-dashboard', headers);
  }

  const { data: userData, error: getUserError } = await client.auth.getUser();
  if (getUserError) {
    console.error('Failed to fetch user from auth for organizer dashboard', getUserError);
  }

  if (userData?.user) {
    await new ProfileServiceServer(client).ensureProfile(userData.user);
  }

  const profileService = new ProfileServiceServer(client);
  const profile = await profileService.getByAuthId(claims.data.claims.sub);

  if (!profile) {
    return redirect('/sign-in', { headers });
  }

  // Check if user has organizer role
  const hasOrganizerRole = profile.roles?.includes(UserRole.ORGANIZER) || profile.roles?.includes(UserRole.ADMIN);
  if (!hasOrganizerRole) {
    return redirect('/dashboard', { headers });
  }

  const [projects, research, questions] = await Promise.all([
    libraryServiceServer.getAllUserProjects(client, profile.username),
    researchServiceServer.getUserResearch(client, profile.username),
    questionServiceServer.getQuestionsByUser(client, profile.username),
  ]);

  const userCreatedDocs: UserCreatedDocs = {
    projects,
    research,
    questions,
  };

  return Response.json({ userCreatedDocs }, { headers });
}

export default function OrganizerDashboardRoute() {
  const { userCreatedDocs } = useLoaderData<typeof loader>();

  return (
    <Main style={{ flex: 1 }}>
      <OrganizerDashboard userCreatedDocs={userCreatedDocs} />
    </Main>
  );
}