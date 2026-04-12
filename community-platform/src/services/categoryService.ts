import type { Category, ContentType } from 'oa-shared';
import { logger } from 'src/logger';
import { apiFetch } from 'src/utils/apiFetch';

const getCategories = async (type: ContentType) => {
  try {
    const response = await apiFetch(`/api/categories/${type}`);
    return (await response.json()) as Category[];
  } catch (error) {
    logger.error('Failed to fetch categories', { error });
    return [];
  }
};

export const categoryService = {
  getCategories,
};
