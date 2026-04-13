import Keyv from 'keyv';
import type { ContentType, DBCategory } from 'oa-shared';
import { Category } from 'oa-shared';
import type { LoaderFunctionArgs } from 'react-router';
import { isProductionEnvironment } from 'src/config/config';
import { createSupabaseServerClient } from 'src/repository/supabase.server';

const cache = new Keyv<Category[]>({ ttl: 3600000 }); // ttl: 60 minutes

const filterByType = (categories: Category[], type: ContentType) => {
  return categories.filter((category) => category.type === type);
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const type = params.type as ContentType;
  const { client, headers } = createSupabaseServerClient(request);
  const tenantId = process.env.TENANT_ID || 'default';
  const cacheKey = `categories-${tenantId}`;

  if (!type) {
    return Response.json({}, { headers, status: 400, statusText: 'type is required' });
  }

  const cachedCategories = await cache.get(cacheKey);

  if (
    cachedCategories &&
    Array.isArray(cachedCategories) &&
    cachedCategories.length &&
    isProductionEnvironment()
  ) {
    const categoriesForType = filterByType(cachedCategories, type);
    return Response.json(categoriesForType, { headers, status: 200 });
  }

  const { data } = await client.from('categories').select('id,name,created_at,type');

  const categories = data?.map((category) => Category.fromDB(category as DBCategory));

  if (categories && categories.length > 0) {
    cache.set(cacheKey, categories, 3600000);
  }

  const categoriesForType = categories ? filterByType(categories, type) : [];

  return Response.json(categoriesForType, { headers, status: 200 });
}
