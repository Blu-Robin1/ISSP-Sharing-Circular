import type { DBMapPin } from 'oa-shared';
import { MapPinFactory } from 'src/factories/mapPinFactory.server';
import { createSupabaseServerClient } from 'src/repository/supabase.server';

// runs on the server
export const loader = async ({ request, params }) => {
  const { client, headers } = createSupabaseServerClient(request);
  try {
    const profileId = Number(params.userId);

    const selectNewSchema = `
        id,
        profile_id,
        city,
        name,
        administrative,
        post_code,
        lat,
        lng,
        moderation,
        moderation_feedback,
        profile:profiles(
          id,
          city,
          display_name,
          photo,
          type,
          about,
          username,
          badges:profile_badges_relations(
            profile_badges(
              id,
              name,
              display_name,
              image_url,
              action_url
            )
          ),
          tags:profile_tags_relations(
            profile_tags(
              id,
              name
            )
          ),
          type:profile_types(
            id,
            name,
            display_name,
            description,
            map_pin_name,
            is_space
          )
        )
      `;

    const selectLegacySchema = `
        id,
        profile_id,
        country,
        country_code,
        name,
        administrative,
        post_code,
        lat,
        lng,
        moderation,
        moderation_feedback,
        profile:profiles(
          id,
          city,
          display_name,
          photo,
          type,
          about,
          username,
          badges:profile_badges_relations(
            profile_badges(
              id,
              name,
              display_name,
              image_url,
              action_url
            )
          ),
          tags:profile_tags_relations(
            profile_tags(
              id,
              name
            )
          ),
          type:profile_types(
            id,
            name,
            display_name,
            description,
            map_pin_name,
            is_space
          )
        )
      `;

    const newResult = await client
      .from('map_pins')
      .select(selectNewSchema)
      .eq('profile_id', profileId)
      .eq('moderation', 'accepted');

    let data: typeof newResult.data = newResult.data;
    let error = newResult.error;

    if (error && (error.code === 'PGRST204' || error.code === '42703')) {
      const legacyResult = await client
        .from('map_pins')
        .select(selectLegacySchema)
        .eq('profile_id', profileId)
        .eq('moderation', 'accepted');
      data = legacyResult.data as typeof newResult.data;
      error = legacyResult.error;
    }

    if (error) {
      console.error(error);

      return Response.json({}, { headers, status: 500, statusText: 'Error fetching map-pins' });
    }

    if (!data?.length) {
      return Response.json({ mapPin: null }, { headers });
    }

    const pinsDb = data[0] as unknown as DBMapPin;
    const pinFactory = new MapPinFactory(client);
    const mapPin = pinFactory.fromDBWithProfile(pinsDb);

    return Response.json({ mapPin }, { headers });
  } catch (error) {
    console.error(error);
    return Response.json({}, { status: 500, headers });
  }
};
