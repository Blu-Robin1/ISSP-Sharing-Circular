import type { DBProfile, Image, ProfileFormData } from 'oa-shared';
import type { ActionFunctionArgs } from 'react-router';
import { ProfileFactory } from 'src/factories/profileFactory.server';
import { createSupabaseServerClient } from 'src/repository/supabase.server';
import { ProfileServiceServer } from 'src/services/profileService.server';
import { ProfileTypesServiceServer } from 'src/services/profileTypesService.server';
import { updateUserActivity } from 'src/utils/activity.server';

export const loader = async ({ request }) => {
  const { client, headers } = createSupabaseServerClient(request);

  try {
    const claims = await client.auth.getClaims();

    console.log('Profile loader: claims', {
      hasClaims: !!claims.data?.claims,
      sub: claims.data?.claims?.sub,
    });

    if (!claims.data?.claims) {
      return Response.json({}, { headers, status: 401 });
    }

    const authId = claims.data.claims.sub;

    const { data: userData, error: getUserError } = await client.auth.getUser();
    if (getUserError) {
      console.error('Failed to fetch user from auth for profile loader', getUserError);
      return Response.json({ error: 'Failed to fetch user' }, { headers, status: 500 });
    }

    if (!userData?.user) {
      console.error('No user data returned from auth.getUser()');
      return Response.json({ error: 'No user data' }, { headers, status: 401 });
    }

    console.log('Profile loader: user data', {
      userId: userData.user.id,
      username: userData.user.user_metadata.username,
      email: userData.user.email,
    });

    try {
      await new ProfileServiceServer(client).ensureProfile(userData.user);
    } catch (ensureError) {
      console.error('Failed to ensure profile in loader', ensureError);
      return Response.json({ error: 'Failed to create profile' }, { headers, status: 500 });
    }

    const nowUtc = new Date().toISOString();

    const { data, error } = await client
      .from('profiles')
      .update({ last_active: nowUtc })
      .eq('auth_id', authId)
      .select(
        `id,
        created_at,
        auth_id,
        username,
        display_name,
        city,
        about,
        photo,
        cover_images,
        roles,
        impact,
        visitor_policy,
        is_blocked_from_messaging,
        is_contactable,
        last_active,
        website,
        patreon,
        total_views,
        donations_enabled,
        profile_type,
        tags:profile_tags_relations(
          profile_tags(
            id,
            name,
            created_at,
            profile_type
          )
        ),
        badges:profile_badges_relations(
          profile_badges(
            id,
            name,
            display_name,
            image_url,
            action_url,
            premium_tier
          )
        ),
        type:profile_types(
          id,
          name,
          display_name,
          image_url,
          small_image_url,
          description,
          map_pin_name,
          is_space
        )`,
      )
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return Response.json({}, { headers, status: 404 });
    }

    const profileFactory = new ProfileFactory(client);
    const profile = profileFactory.fromDB(data as unknown as DBProfile);
    const json = { ...profile, roles: data.roles ?? profile.roles ?? null };

    return Response.json(json, { headers, status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { headers, status: 500 });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { client, headers } = createSupabaseServerClient(request);

  try {
    const formData = await request.formData();
    const city = formData.get('city');

    let existingPhoto: Image | null = null;

    if (formData.has('existingPhoto')) {
      existingPhoto = JSON.parse(formData.get('existingPhoto') as string);
    }

    const data = {
      displayName: formData.get('displayName') as string,
      about: formData.get('about') as string,
      city: city === 'null' ? null : city,
      type: formData.get('type'),
      existingPhoto,
      isContactable: formData.get('isContactable') === 'true',
      showVisitorPolicy: formData.get('showVisitorPolicy') === 'true',
      visitorPreferenceDetails: formData.get('visitorPreferenceDetails') as string,
      visitorPreferencePolicy: formData.get('visitorPreferencePolicy') as string,
      existingCoverImageIds: formData.has('existingCoverImageIds')
        ? formData.getAll('existingCoverImageIds')
        : null,
      tagIds: formData.has('tagIds') ? formData.getAll('tagIds').map((x) => Number(x)) : null,
      website: formData.get('website'),
      photo: formData.get('photo') as File,
      coverImages: formData.getAll('coverImages') as File[],
    } as ProfileFormData;

    const claims = await client.auth.getClaims();

    console.log('Profile action: claims', {
      hasClaims: !!claims.data?.claims,
      sub: claims.data?.claims?.sub,
    });

    if (!claims.data?.claims) {
      return Response.json({}, { headers, status: 401 });
    }

    const authId = claims.data.claims.sub;
    const profileService = new ProfileServiceServer(client);
    let profileData = await profileService.getByAuthId(authId);

    if (!profileData?.id) {
      const { data: idRow, error: idLookupError } = await client
        .from('profiles')
        .select('id')
        .eq('auth_id', authId)
        .maybeSingle();
      if (idLookupError) {
        console.error('[api.profile action] profile id lookup:', idLookupError);
      }
      if (idRow?.id != null) {
        profileData = await profileService.getById(idRow.id);
      }
    }

    const profileTypes = await new ProfileTypesServiceServer(client).get();

    const memberTypes = profileTypes.filter((x) => x.isSpace === false).map((x) => x.name) || null;

    const { valid, status, statusText } = await validateRequest(
      request,
      data,
      profileData,
      memberTypes,
    );

    if (!valid) {
      return Response.json({}, { headers, status, statusText });
    }

    if (!profileData?.id) {
      throw new Error('profile not found');
    }

    const profile = await profileService.updateProfile(profileData.id, data);

    updateUserActivity(client, claims.data.claims.sub);

    return Response.json(profile, { headers, status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({}, { headers, status: 500 });
  }
};

async function validateRequest(
  request: Request,
  data: ProfileFormData,
  profile: { id: number } | null,
  memberTypes: string[] | null,
) {
  if (request.method !== 'POST') {
    return { valid: false, status: 405, statusText: 'method not allowed' };
  }

  if (!profile?.id) {
    return { valid: false, status: 400, statusText: 'profile not found' };
  }

  if (!data.displayName) {
    return { valid: false, status: 400, statusText: 'displayName is required' };
  }

  if (!data.type) {
    return { valid: false, status: 400, statusText: 'type is required' };
  }

  if (!memberTypes || !memberTypes?.includes(data.type)) {
    if (!data.existingPhoto && !data.photo) {
      return { valid: false, status: 400, statusText: 'photo is required' };
    }

    if (
      (!data.existingCoverImageIds || data.existingCoverImageIds.length === 0) &&
      (!data.coverImages || data.coverImages.length === 0)
    ) {
      return { valid: false, status: 400, statusText: 'cover images are required' };
    }

    if (data.showVisitorPolicy && !data.visitorPreferencePolicy) {
      return { valid: false, status: 400, statusText: 'visitor policy is required' };
    }
  }

  return { valid: true };
}
