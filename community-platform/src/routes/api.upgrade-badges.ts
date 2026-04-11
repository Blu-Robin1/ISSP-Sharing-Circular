import Keyv from 'keyv';
import type { DBUpgradeBadge } from 'oa-shared';
import { UpgradeBadge } from 'oa-shared';
import type { LoaderFunctionArgs } from 'react-router';
import { isProductionEnvironment } from 'src/config/config';
import { createSupabaseServerClient } from 'src/repository/supabase.server';

const cache = new Keyv<UpgradeBadge[]>({ ttl: 1800000 }); // ttl: 30 minutes

export async function loader({ request }: LoaderFunctionArgs) {
  let headers = {};

  try {
    const response = createSupabaseServerClient(request);
    headers = response.headers;
    const client = response.client;

    const cachedUpgradeBadges = await cache.get('upgradeBadges');

    if (
      cachedUpgradeBadges &&
      Array.isArray(cachedUpgradeBadges) &&
      cachedUpgradeBadges.length &&
      isProductionEnvironment()
    ) {
      return Response.json(cachedUpgradeBadges, { headers, status: 200 });
    }

    const { data, error } = await client.from('upgrade_badge').select(
      `
        *,
        badge:profile_badges(id, name, display_name, image_url, action_url)
      `,
    );

    if (error) {
      return Response.json([], { headers, status: 200 });
    }

    const upgradeBadges =
      data
        ?.map((badge) => {
          try {
            return UpgradeBadge.fromDB(badge as DBUpgradeBadge);
          } catch (_err) {
            return null;
          }
        })
        .filter((badge) => badge !== null) || [];

    if (upgradeBadges && upgradeBadges.length > 0) {
      cache.set('upgradeBadges', upgradeBadges, 1800000);
    }

    return Response.json(upgradeBadges, { headers, status: 200 });
  } catch (_error) {
    return Response.json([], { headers, status: 200 });
  }
}
