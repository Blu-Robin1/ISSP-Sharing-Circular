import type { Banner } from 'oa-shared';
import { apiFetch } from 'src/utils/apiFetch';

const getBanner = async () => {
  try {
    const response = await apiFetch('/api/banner');
    return (await response.json()) as Banner;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export const bannerService = {
  getBanner,
};
