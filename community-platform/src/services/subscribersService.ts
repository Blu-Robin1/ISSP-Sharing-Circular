import type { SubscribableContentTypes } from 'oa-shared';
import { apiFetch } from 'src/utils/apiFetch';

const add = async (contentType: SubscribableContentTypes, id: number) => {
  return await apiFetch(`/api/subscribers/${contentType}/${id}`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
};

const remove = async (contentType: SubscribableContentTypes, id: number) => {
  return await apiFetch(`/api/subscribers/${contentType}/${id}`, {
    method: 'DELETE',
  });
};

const isSubscribed = async (contentType: SubscribableContentTypes, id: number) => {
  try {
    const response = await apiFetch(`/api/subscribers/${contentType}/${id}/subscribed`);

    const { subscribed } = await response.json();

    return !!subscribed;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const subscribersService = {
  add,
  remove,
  isSubscribed,
};
