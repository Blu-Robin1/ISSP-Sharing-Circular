import type { SupabaseClient } from '@supabase/supabase-js';
import type { Moderation, Profile, UpsertPin } from 'oa-shared';

export class MapServiceServer {
  constructor(private client: SupabaseClient) {}

  async upsert(pin: UpsertPin, profile: Profile) {
    const existingPin = await this.client
      .from('map_pins')
      .select('id,moderation')
      .eq('profile_id', pin.profile_id);
    const existingPinId = existingPin.data?.at(0)?.id;

    if (existingPinId) {
      const moderation: Moderation =
        existingPin.data![0].moderation === 'accepted' ? 'accepted' : 'awaiting-moderation';

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
          profile:profiles(
            id,
            city,
            display_name,
            photo,
            type,
            username
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
          )`;

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
          profile:profiles(
            id,
            city,
            display_name,
            photo,
            type,
            username
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
          )`;

      let result = await this.client
        .from('map_pins')
        .update({
          city: pin.country,
          name: pin.name,
          administrative: pin.administrative,
          post_code: pin.post_code,
          moderation,
          lat: pin.lat,
          lng: pin.lng,
        })
        .eq('id', existingPinId)
        .select(selectNewSchema)
        .single();

      if (result.error && (result.error.code === 'PGRST204' || result.error.code === '42703')) {
        result = await this.client
          .from('map_pins')
          .update({
            country: pin.country,
            country_code: pin.country_code,
            name: pin.name,
            administrative: pin.administrative,
            post_code: pin.post_code,
            moderation,
            lat: pin.lat,
            lng: pin.lng,
          })
          .eq('id', existingPinId)
          .select(selectLegacySchema)
          .single();
      }

      return result;
    } else {
      const moderation: Moderation =
        profile.type?.name === 'member' ? 'accepted' : 'awaiting-moderation';

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
          profile:profiles(
            id,
            type,
            display_name,
            username,
            photo,
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
              image_url,
              small_image_url,
              map_pin_name,
              description,
              is_space
            )
          )`;

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
          profile:profiles(
            id,
            type,
            display_name,
            username,
            photo,
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
              image_url,
              small_image_url,
              map_pin_name,
              description,
              is_space
            )
          )`;

      let result = await this.client
        .from('map_pins')
        .insert({
          profile_id: pin.profile_id,
          city: pin.country,
          name: pin.name,
          administrative: pin.administrative,
          post_code: pin.post_code,
          lat: pin.lat,
          lng: pin.lng,
          moderation,
          tenant_id: process.env.TENANT_ID,
        })
        .select(selectNewSchema)
        .single();

      if (result.error && (result.error.code === 'PGRST204' || result.error.code === '42703')) {
        result = await this.client
          .from('map_pins')
          .insert({
            profile_id: pin.profile_id,
            country: pin.country,
            country_code: pin.country_code,
            name: pin.name,
            administrative: pin.administrative,
            post_code: pin.post_code,
            lat: pin.lat,
            lng: pin.lng,
            moderation,
            tenant_id: process.env.TENANT_ID,
          })
          .select(selectLegacySchema)
          .single();
      }

      return result;
    }
  }
}
