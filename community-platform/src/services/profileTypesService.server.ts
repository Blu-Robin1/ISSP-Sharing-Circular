import type { SupabaseClient } from '@supabase/supabase-js';
import Keyv from 'keyv';
import { ProfileType } from 'oa-shared';
import { isProductionEnvironment } from 'src/config/config';

const cache = new Keyv<ProfileType[]>({ ttl: 3600000 }); // ttl: 60 minutes

export class ProfileTypesServiceServer {
  constructor(private client: SupabaseClient) {}

  async get(cached = true) {
    const tenantId = process.env.TENANT_ID || 'default';
    const cacheKey = `profile-types-${tenantId}`;

    if (cached) {
      const cachedProfileTypes = await cache.get(cacheKey);

      if (
        cachedProfileTypes &&
        Array.isArray(cachedProfileTypes) &&
        cachedProfileTypes.length &&
        isProductionEnvironment()
      ) {
        return cachedProfileTypes;
      }
    }

    const profileTypesResult = await this.client.from('profile_types').select(`
      id,
      name,
      display_name,
      order,
      description,
      map_pin_name,
      is_space,
      tenant_id
      `);

    const dbProfileTypes = profileTypesResult.data || [];
    const profileTypes = dbProfileTypes.map((x) => ProfileType.fromDB(x));

    await cache.set(cacheKey, profileTypes);

    return profileTypes;
  }
}
