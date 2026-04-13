import type { SupabaseClient } from '@supabase/supabase-js';
import Keyv from 'keyv';
import type { DBMapPin, MapPin } from 'oa-shared';
import { isProductionEnvironment } from 'src/config/config';
import { MapPinFactory } from 'src/factories/mapPinFactory.server';

const cache = new Keyv<MapPin[]>({ ttl: 3600000 }); // ttl: 60 minutes

export class MapPinsServiceServer {
  constructor(private client: SupabaseClient) {}

  async get() {
    const cachedMappins = await cache.get('mappins');

    // check if cached map pins are available and a producation environment, if not - load from db and cache them
    if (
      cachedMappins &&
      Array.isArray(cachedMappins) &&
      cachedMappins.length > 0 &&
      isProductionEnvironment()
    ) {
      return cachedMappins;
    }

    // get all profile tags
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
          cover_images,
          about,
          username,
          last_active,
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
        profile:profiles(
          id,
          city,
          display_name,
          photo,
          cover_images,
          about,
          username,
          last_active,
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

    const newResult = await this.client
      .from('map_pins')
      .select(selectNewSchema)
      .eq('moderation', 'accepted');

    let data: typeof newResult.data = newResult.data;
    let error = newResult.error;

    if (error && (error.code === 'PGRST204' || error.code === '42703')) {
      const legacyResult = await this.client
        .from('map_pins')
        .select(selectLegacySchema)
        .eq('moderation', 'accepted');
      data = legacyResult.data as typeof newResult.data;
      error = legacyResult.error;
    }

    if (!data || error) {
      throw error;
    }

    const pinsDb = data as unknown as DBMapPin[];
    const pinFactory = new MapPinFactory(this.client);
    const mapPins = pinsDb
      .filter((pin) => pin.profile)
      .map((pin) => pinFactory.fromDBWithProfile(pin));

    cache.set('mappins', mapPins);

    return mapPins;
  }

  async delete(profileId: number) {
    const { error } = await this.client.from('map_pins').delete().eq('profile_id', profileId);

    if (error) {
      throw error;
    }

    cache.delete('mappins');
  }

  clearCache() {
    cache.delete('mappins');
  }
}
