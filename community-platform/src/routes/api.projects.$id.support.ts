import type { ActionFunctionArgs } from 'react-router';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { projectSupportService } from 'src/services/projectSupportService.server';

export async function action({ request, params }: ActionFunctionArgs) {
  const { client, headers } = createSupabaseServerClient(request);

  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers });
  }

  try {
    const formData = await request.formData();
    const projectId = parseInt(params.id as string);
    const actionType = formData.get('actionType') as string;
    const data = JSON.parse(formData.get('data') as string || '{}');

    if (!projectId || !actionType) {
      return Response.json({ error: 'Missing required fields' }, { status: 400, headers });
    }

    const result = await projectSupportService.addSupport(client, projectId, actionType, data);

    if (result.error) {
      return Response.json({ error: result.error }, { status: 400, headers });
    }

    return Response.json({ success: true }, { headers });
  } catch (error) {
    console.error('Error processing support action:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500, headers });
  }
}