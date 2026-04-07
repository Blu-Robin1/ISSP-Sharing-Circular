import type { ProfileTag } from 'oa-shared';
import { apiFetch } from 'src/utils/apiFetch';

const getAllTags = async () => {
  try {
    const response = await apiFetch('/api/profile-tags');

    const profileTags = (await response.json()) as ProfileTag[];

    return profileTags;
  } catch (error) {
    console.error({ error });
    return [];
  }
};

export const profileTagsService = {
  getAllTags,
};
