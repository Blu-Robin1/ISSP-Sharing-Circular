import type { SupabaseClient } from '@supabase/supabase-js';
import type { DBProfile, DBProject, DBProjectStep, Moderation } from 'oa-shared';
import { Project, ProjectStep, UserRole } from 'oa-shared';
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { IMAGE_SIZES } from 'src/config/imageTransforms';
import type { LibrarySortOption } from 'src/pages/Library/Content/List/LibrarySortOptions';
import { ITEMS_PER_PAGE } from 'src/pages/Library/constants';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { contentServiceServer } from 'src/services/contentService.server';
import { ProfileServiceServer } from 'src/services/profileService.server';
import { storageServiceServer } from 'src/services/storageService.server';
import { subscribersServiceServer } from 'src/services/subscribersService.server';
import { updateUserActivity } from 'src/utils/activity.server';
import { computeEffectiveStage } from 'src/utils/projectStageLogic';
import { convertToSlug } from 'src/utils/slug';
import { validateImage } from 'src/utils/storage';

type ProjectStatusFilter = 'approved' | 'pending' | 'approved_and_pending' | 'all';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const q = searchParams.get('q');
  const stage = Number(searchParams.get('stage')) || undefined;
  const sort = searchParams.get('sort') as LibrarySortOption;
  const skip = Number(searchParams.get('skip')) || 0;
  const status = (searchParams.get('status') as ProjectStatusFilter | null) ?? 'approved';

  const { client, headers } = createSupabaseServerClient(request);
  const claims = await client.auth.getClaims();

  const username = claims.data?.claims?.user_metadata?.username || null;
  let isAdmin = false;
  let profileId: number | null = null;

  if (claims.data?.claims?.sub) {
    const { data: profile } = await client
      .from('profiles')
      .select('id,roles')
      .eq('auth_id', claims.data.claims.sub)
      .limit(1)
      .maybeSingle();

    isAdmin = profile?.roles?.includes(UserRole.ADMIN) ?? false;
    profileId = profile?.id ?? null;
  }

  if (status !== 'approved') {
    let query = client.from('projects').select('*', { count: 'exact' });

    query = query.or('deleted.is.null,deleted.eq.false');
    query = query.or('is_draft.is.null,is_draft.eq.false');

    if (q) {
      query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
    }

    switch (status) {
      case 'pending':
        query = query.eq('moderation', 'awaiting-moderation');
        if (!isAdmin) {
          if (!profileId) {
            return Response.json({ items: [], total: 0 }, { headers });
          }
          query = query.eq('created_by', profileId);
        }
        break;
      case 'approved_and_pending':
        if (isAdmin) {
          query = query.in('moderation', ['accepted', 'awaiting-moderation']);
        } else if (profileId) {
          query = query.or(
            `moderation.eq.accepted,and(created_by.eq.${profileId},moderation.eq.awaiting-moderation)`,
          );
        } else {
          query = query.eq('moderation', 'accepted');
        }
        break;
      case 'all':
        if (!isAdmin) {
          if (!profileId) {
            return Response.json({ items: [], total: 0 }, { headers });
          }
          query = query.eq('created_by', profileId);
        }
        break;
      default:
        query = query.eq('moderation', 'accepted');
        break;
    }

    switch (sort) {
      case 'LatestUpdated':
        query = query.order('modified_at', { ascending: false, nullsFirst: false });
        break;
      case 'MostComments':
        query = query.order('comment_count', { ascending: false, nullsFirst: false });
        break;
      case 'MostDownloads':
        query = query.order('file_download_count', { ascending: false, nullsFirst: false });
        break;
      case 'MostViews':
        query = query.order('total_views', { ascending: false, nullsFirst: false });
        break;
      case 'Newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    const rangeEnd = stage ? 999 : skip + ITEMS_PER_PAGE - 1;
    const { data, error, count } = await query.range(stage ? 0 : skip, rangeEnd);

    if (error) {
      console.error(error);
      return Response.json({}, { status: 500, headers });
    }

    const allDbItems = (data as DBProject[]) ?? [];
    const stageFilteredItems =
      stage === undefined
        ? allDbItems
        : allDbItems.filter((item) => {
            const effectiveStage = computeEffectiveStage({
              stage: item.stage,
              stageOverride: item.stage_override,
              supporterCount: item.supporter_count || 0,
              memberCount: item.member_count || 0,
              championCount: item.champion_count || 0,
              volunteerCount: item.volunteer_count || 0,
              donateCount: item.donate_count || 0,
              moderation: item.moderation,
            });

            return effectiveStage === stage;
          });

    const items =
      stage === undefined
        ? stageFilteredItems
        : stageFilteredItems.slice(skip, skip + ITEMS_PER_PAGE);
    const total = stage === undefined ? (count ?? items.length) : stageFilteredItems.length;

    return Response.json({ items, total }, { headers });
  }

  const { data, error } = await client.rpc('get_projects', {
    search_query: q || null,
    category_id: null,
    sort_by: sort,
    offset_val: stage ? 0 : skip,
    limit_val: stage ? 1000 : ITEMS_PER_PAGE,
    current_username: username,
  });

  if (error) {
    console.error(error);
    return Response.json({}, { status: 500, headers });
  }

  const allDbItems = (data as DBProject[]) ?? [];
  const stageFilteredItems =
    stage === undefined
      ? allDbItems
      : allDbItems.filter((item) => {
          const effectiveStage = computeEffectiveStage({
            stage: item.stage,
            stageOverride: item.stage_override,
            supporterCount: item.supporter_count || 0,
            memberCount: item.member_count || 0,
            championCount: item.champion_count || 0,
            volunteerCount: item.volunteer_count || 0,
            donateCount: item.donate_count || 0,
            moderation: item.moderation,
          });

          return effectiveStage === stage;
        });
  const dbItems =
    stage === undefined
      ? stageFilteredItems
      : stageFilteredItems.slice(skip, skip + ITEMS_PER_PAGE);
  const count =
    stage === undefined
      ? ((
          await client.rpc('get_projects_count', {
            search_query: q || null,
            category_id: null,
            current_username: username,
          })
        ).data ?? 0)
      : stageFilteredItems.length;

  if (dbItems.length > 0) {
    const { data: locationRows } = await client
      .from('projects')
      .select('id, lat, lng')
      .in(
        'id',
        dbItems.map((item) => item.id),
      );

    const locationById = new Map((locationRows ?? []).map((row) => [row.id, row]));

    for (const item of dbItems) {
      const location = locationById.get(item.id);
      if (location) {
        item.lat = location.lat;
        item.lng = location.lng;
      }
    }
  }

  const items = dbItems.map((x) => {
    const images = x.cover_image
      ? storageServiceServer.getPublicUrls(client, [x.cover_image], IMAGE_SIZES.LIST)
      : [];
    return Project.fromDB(x, [], images);
  });

  if (items && items.length > 0) {
    // Populate useful votes
    const votes = await client.rpc('get_useful_votes_count_by_content_id', {
      p_content_type: 'projects',
      p_content_ids: items.map((x) => x.id),
    });

    if (votes.data) {
      const votesByContentId = votes.data.reduce((acc, current) => {
        acc.set(current.content_id, current.count);
        return acc;
      }, new Map());

      for (const item of items) {
        if (votesByContentId.has(item.id)) {
          item.usefulCount = votesByContentId.get(item.id)!;
        }
      }
    }
  }

  return Response.json({ items, total: count }, { headers });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { client, headers } = createSupabaseServerClient(request);

  try {
    const formData = await request.formData();
    const isDraft = formData.get('draft') === 'true';
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      isDraft,
      mapInitiative: formData.get('mapInitiative') === 'true',
      time: formData.get('time') as string,
      category: formData.has('category') ? (formData.get('category') as string) : null,
      tags: formData.has('tags') ? formData.getAll('tags').map((x) => Number(x)) : null,
      fileLink: formData.has('fileLink') ? (formData.get('fileLink') as string) : null,
      difficultyLevel: formData.has('difficultyLevel')
        ? (formData.get('difficultyLevel') as string)
        : null,
      moderation: isDraft ? undefined : ('awaiting-moderation' as Moderation),
      stepCount: parseInt(formData.get('stepCount') as string, 10),
      lat: formData.has('lat') && formData.get('lat') !== '' ? Number(formData.get('lat')) : null,
      lng: formData.has('lng') && formData.get('lng') !== '' ? Number(formData.get('lng')) : null,
      slug: convertToSlug((formData.get('title') as string) || ''),
      uploadedCoverImage: formData.get('coverImage') as File | null,
      uploadedFiles: formData.getAll('files') as File[] | null,
    };

    const claims = await client.auth.getClaims();

    if (!claims.data?.claims) {
      return Response.json({ error: 'Sign in required to create a project.' }, { headers, status: 401 });
    }

    const { valid, status, statusText } = await validateRequest(request, data, client);

    if (!valid) {
      return Response.json(
        { error: statusText ?? 'Invalid request' },
        { headers, status, statusText },
      );
    }

    const profileService = new ProfileServiceServer(client);
    const profile = await profileService.getByAuthId(claims.data.claims.sub);

    if (!isDraft && profile?.roles?.includes(UserRole.ADMIN)) {
      data.moderation = 'accepted';
    }

    if (!profile) {
      return Response.json({ error: 'User profile not found' }, { headers, status: 400, statusText: 'User not found' });
    }

    const projectDb = await createProject(client, data, profile);
    const project = Project.fromDB(projectDb, []);

    if (data.uploadedCoverImage) {
      const images = await uploadAndUpdateImage(
        [data.uploadedCoverImage],
        `projects/${project.id}`,
        'projects',
        'cover_image',
        project.id,
        client,
      );
      if (images && images[0]) {
        project.coverImage = images[0];
      }
    }

    if (data.uploadedFiles) {
      await uploadAndUpdateFiles(data.uploadedFiles, `projects/${project.id}`, project, client);
    }

    project.steps = await uploadSteps(data, formData, projectDb, client);
    subscribersServiceServer.add('projects', project.id, profile.id, client, headers);

    updateUserActivity(client, claims.data.claims.sub);

    return Response.json({ project }, { headers, status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: 'Could not save project. Please try again.' },
      { headers, status: 500, statusText: 'Error creating project' },
    );
  }
};

async function uploadSteps(data, formData, projectDb, client) {
  const steps: ProjectStep[] = [];
  for (let i = 0; i < data.stepCount; i++) {
    const images = formData.getAll(`steps.[${i}].images`) as File[];

    const stepDb = await createStep(client, {
      title: formData.get(`steps.[${i}].title`) as string,
      description: formData.get(`steps.[${i}].description`) as string,
      videoUrl: (formData.get(`steps.[${i}].videoUrl`) as string) || null,
      projectId: projectDb.id,
      order: i + 1,
    });
    const step = ProjectStep.fromDB(stepDb);

    step.images = await uploadAndUpdateImage(
      images,
      `projects/${projectDb.id}`,
      'project_steps',
      'images',
      step.id,
      client,
    );

    steps.push(step);
  }

  return steps;
}

async function validateRequest(request: Request, data: any, client: SupabaseClient) {
  if (request.method !== 'POST') {
    return { status: 405, statusText: 'method not allowed' };
  }

  if (!data.title) {
    return { status: 400, statusText: 'title is required' };
  } else if (data.title.length < 5) {
    return { status: 400, statusText: 'title is too short' };
  }

  if (!data.description) {
    return { status: 400, statusText: 'description is required' };
  }

  const mapInitiativeOk =
    data.mapInitiative === true &&
    data.lat != null &&
    !Number.isNaN(Number(data.lat)) &&
    data.lng != null &&
    !Number.isNaN(Number(data.lng));

  if (!data.isDraft && !mapInitiativeOk && (!data.stepCount || data.stepCount < 3)) {
    return { status: 400, statusText: '3 steps are required' };
  }

  if (await contentServiceServer.isDuplicateNewSlug(data.slug, client, 'projects')) {
    return { status: 409, statusText: 'This project already exists' };
  }

  const imageValidation = validateImage(data.uploadedCoverImage);

  if (!imageValidation.valid) {
    return {
      valid: false,
      status: 400,
      statusText: imageValidation.error?.message,
    };
  }

  return { valid: true };
}

async function createProject(
  client: SupabaseClient,
  data: {
    title: string;
    description: string;
    isDraft: boolean;
    category: string | null;
    tags: number[] | null;
    fileLink: string | null;
    difficultyLevel: string | null;
    time: string | null;
    moderation?: Moderation;
    lat: number | null;
    lng: number | null;
    slug: string;
  },
  profile: DBProfile,
) {
  const projectResult = await client
    .from('projects')
    .insert({
      created_by: profile.id,
      title: data.title,
      description: data.description,
      slug: data.slug,
      category: data.category,
      tags: data.tags,
      is_draft: data.isDraft,
      file_link: data.fileLink,
      difficulty_level: data.difficultyLevel,
      time: data.time,
      lat: data.lat,
      lng: data.lng,
      moderation: data.moderation,
      tenant_id: process.env.TENANT_ID,
    })
    .select();

  if (projectResult.error || !projectResult.data) {
    throw projectResult.error;
  }

  return projectResult.data[0] as unknown as DBProject;
}

async function createStep(
  client: SupabaseClient,
  values: {
    title: string;
    description: string;
    projectId: number;
    videoUrl: string | null;
    order: number;
  },
) {
  const { data, error } = await client
    .from('project_steps')
    .insert({
      title: values.title,
      description: values.description,
      project_id: values.projectId,
      video_url: values.videoUrl,
      order: values.order,
      tenant_id: process.env.TENANT_ID,
    })
    .select();

  if (error || !data) {
    throw error;
  }

  return data[0] as unknown as DBProjectStep;
}

async function uploadAndUpdateImage(
  files: File[],
  path: string,
  tableName: 'projects' | 'project_steps',
  fieldName: string,
  id: number,
  client: SupabaseClient,
) {
  const mediaResult = await storageServiceServer.uploadImage(files, path, client);

  if (mediaResult?.media && mediaResult.media.length > 0) {
    const result = await client
      .from(tableName)
      .update({
        [fieldName]: fieldName === 'cover_image' ? mediaResult.media[0] : mediaResult.media,
      })
      .eq('id', id)
      .select();

    if (result.data) {
      return result.data[0][fieldName];
    }
  }
}

async function uploadAndUpdateFiles(
  files: File[],
  path: string,
  project: Project,
  client: SupabaseClient,
) {
  const mediaResult = await storageServiceServer.uploadFile(files, path, client);

  if (mediaResult?.media && mediaResult.media.length > 0) {
    const result = await client
      .from('projects')
      .update({
        files: mediaResult.media,
      })
      .eq('id', project.id)
      .select();

    if (result.data) {
      project.files = result.data[0].files;
    }
  }
}
