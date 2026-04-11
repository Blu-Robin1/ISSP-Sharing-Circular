import type { ProjectSupportActionType } from 'oa-shared';
import type { ActionFunctionArgs } from 'react-router';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { projectSupportService } from 'src/services/projectSupportService.server';

const SUPPORT_ACTION_TYPES: ProjectSupportActionType[] = [
  'add_my_name',
  'volunteer_skills',
  'pledge_membership',
  'donate',
  'champion',
];

function isProjectSupportActionType(value: string): value is ProjectSupportActionType {
  return SUPPORT_ACTION_TYPES.includes(value as ProjectSupportActionType);
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { client, headers } = createSupabaseServerClient(request);

  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers });
  }

  try {
    const formData = await request.formData();
    const projectId = parseInt(params.id as string);
    const actionType = formData.get('actionType') as string;
    const data = JSON.parse((formData.get('data') as string) || '{}');

    if (!projectId || !actionType) {
      return Response.json({ error: 'Missing required fields' }, { status: 400, headers });
    }

    if (!isProjectSupportActionType(actionType)) {
      return Response.json({ error: 'Invalid action type' }, { status: 400, headers });
    }

    await projectSupportService.addSupport(client, projectId, actionType, data);

    return Response.json({ success: true }, { headers });
  } catch (error) {
    console.error('Error processing support action:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500, headers });
  }
}
