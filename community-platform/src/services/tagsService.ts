import type { Tag } from 'oa-shared';
import { apiFetch } from 'src/utils/apiFetch';

const getAllTags = async () => {
  try {
    const response = await apiFetch('/api/tags');
    return (await response.json()) as Tag[];
  } catch (error) {
    console.error({ error });
    return [];
  }
};

export const tagsService = {
  getAllTags,
};
