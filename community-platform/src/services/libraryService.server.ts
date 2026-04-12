import type { SupabaseClient } from '@supabase/supabase-js';
import type { DBProject, DBProjectStep, Image } from 'oa-shared';
import { Project, UserRole } from 'oa-shared';
import { IMAGE_SIZES } from 'src/config/imageTransforms';
import { storageServiceServer } from './storageService.server';

const getBySlug = async (client: SupabaseClient, slug: string) => {
  const selectProject = (stepOrderField: 'stage' | 'order') => `
        id,
        created_at,
        created_by,
        modified_at,
        title,
        description,
        slug,
        cover_image,
        category:categories(id,name),
        tags,
        total_views,
        is_draft,
        files, 
        file_link, 
        file_download_count,
        time,
        lat,
        lng,
        difficulty_level,
        comment_count,
        moderation,
        moderation_feedback,
        author:profiles(id, display_name, username, photo, city, donations_enabled,
          profile_type(id, display_name, name, is_space, image_url, small_image_url),
          badges:profile_badges_relations(
            profile_badges(
              id,
              name,
              display_name,
              image_url,
              action_url
            )
          )
        ),
        steps:project_steps(
          id, 
          created_at, 
          title, 
          description, 
          images, 
          video_url,
          ${stepOrderField}
        )
     `;

  let result = await client
    .from('projects')
    .select(selectProject('stage'))
    .or(`slug.eq.${slug},previous_slugs.cs.{"${slug}"}`)
    .or('deleted.eq.false,deleted.is.null')
    .single();

  if (result.error && (result.error.code === 'PGRST204' || result.error.code === '42703')) {
    result = await client
      .from('projects')
      .select(selectProject('order'))
      .or(`slug.eq.${slug},previous_slugs.cs.{"${slug}"}`)
      .or('deleted.eq.false,deleted.is.null')
      .single();
  }

  return result;
};

const getUserProjects = async (
  client: SupabaseClient,
  username: string,
): Promise<Partial<Project>[]> => {
  const { data, error } = await client.rpc('get_user_projects', {
    username_param: username,
  });

  if (error) {
    return [];
  }

  return data?.map((x) => ({
    id: x.id,
    title: x.title,
    slug: x.slug,
    usefulCount: x.total_useful,
  }));
};

const getAllUserProjects = async (
  client: SupabaseClient,
  username: string,
): Promise<Partial<Project>[]> => {
  try {
    // First, get the profile ID for the username
    const { data: profileData, error: profileError } = await client
      .from('profiles')
      .select('id')
      .eq('username', username)
      .single();

    if (profileError) {
      return [];
    }

    if (!profileData) {
      return [];
    }

    // Then fetch all projects created by this user (including drafts and non-accepted)
    const { data: projects, error } = await client
      .from('projects')
      .select('id, title, slug, total_views, created_by, deleted, is_draft')
      .eq('created_by', profileData.id)
      .order('created_at', { ascending: false });

    if (error) {
      return [];
    }

    if (!projects || projects.length === 0) {
      return [];
    }

    return projects.map((x) => ({
      id: x.id,
      title: x.title,
      slug: x.slug,
      usefulCount: 0,
    }));
  } catch (err) {
    return [];
  }
};

const getProjectPublicMedia = (projectDb: DBProject, client: SupabaseClient) => {
  const allImages: Image[] = [];
  if (projectDb.cover_image) {
    const coverImage = storageServiceServer.getPublicUrls(client, [projectDb.cover_image])?.at(0);

    if (coverImage) {
      allImages.push(coverImage);
    }
  }

  const stepImages = projectDb.steps?.flatMap((x) => x.images)?.filter((x) => !!x) || [];

  const publicStepImages = stepImages
    ? storageServiceServer.getPublicUrls(client, stepImages)
    : [];

  return [...allImages, ...publicStepImages.filter((x) => !!x)];
};

const isAllowedToEditProject = async (
  client: SupabaseClient,
  authorUsername: string,
  currentUsername: string,
) => {
  if (!currentUsername) {
    return false;
  }

  if (currentUsername === authorUsername) {
    return true;
  }

  const { data } = await client.from('profiles').select('roles').eq('username', currentUsername);

  return data?.at(0)?.roles?.includes(UserRole.ADMIN);
};

const isAllowedToEditProjectById = async (
  client: SupabaseClient,
  id: number,
  currentUsername: string,
) => {
  const projectResult = await client.from('projects').select('id,created_by').eq('id', id).single();

  const project = projectResult.data as unknown as DBProject;

  const item = Project.fromDB(project, []);

  return isAllowedToEditProject(client, item.author?.username || '', currentUsername);
};

async function getById(id: number, client: SupabaseClient) {
  const result = await client.from('projects').select().eq('id', id).single();
  return result.data as DBProject;
}

async function getProjectStepIds(id: number, client: SupabaseClient): Promise<number[]> {
  const result = await client.from('project_steps').select('id').eq('project_id', id);

  return result.data?.map((x) => x.id) as number[];
}

async function upsertStep(
  client: SupabaseClient,
  stepId: number | null,
  values: {
    title: string;
    description: string;
    projectId: number;
    videoUrl: string | null;
    order: number;
  },
) {
  const payloadWithStage = {
    title: values.title,
    description: values.description,
    project_id: values.projectId,
    video_url: values.videoUrl,
    stage: values.order,
  };

  const payloadWithOrder = {
    title: values.title,
    description: values.description,
    project_id: values.projectId,
    video_url: values.videoUrl,
    order: values.order,
  };

  if (stepId) {
    let result = await client.from('project_steps').update(payloadWithStage).eq('id', stepId).select();

    if (result.error && result.error.code === 'PGRST204') {
      result = await client.from('project_steps').update(payloadWithOrder).eq('id', stepId).select();
    }

    if (result.error || !result.data) {
      throw result.error;
    }

    return result.data[0] as unknown as DBProjectStep;
  } else {
    let result = await client
      .from('project_steps')
      .insert({
        ...payloadWithStage,
        tenant_id: process.env.TENANT_ID,
      })
      .select();

    if (result.error && result.error.code === 'PGRST204') {
      result = await client
        .from('project_steps')
        .insert({
          ...payloadWithOrder,
          tenant_id: process.env.TENANT_ID,
        })
        .select();
    }

    if (result.error || !result.data) {
      throw result.error;
    }

    return result.data[0] as unknown as DBProjectStep;
  }
}

async function deleteStepsById(ids: number[], client: SupabaseClient) {
  await client.from('project_steps').delete().in('id', ids);
}

export const libraryServiceServer = {
  getBySlug,
  getById,
  getUserProjects,
  getAllUserProjects,
  getProjectPublicMedia,
  isAllowedToEditProject,
  isAllowedToEditProjectById,
  upsertStep,
  getProjectStepIds,
  deleteStepsById,
};
