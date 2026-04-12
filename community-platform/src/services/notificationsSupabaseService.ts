import type { NotificationDisplay } from 'oa-shared';
import { apiFetch } from 'src/utils/apiFetch';

const getNotifications = async () => {
  try {
    const response = await apiFetch('/api/notifications');
    const result = (await response.json()) as {
      notifications: NotificationDisplay[];
    };

    return result.notifications;
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const notificationSupabaseService = {
  getNotifications,
};
