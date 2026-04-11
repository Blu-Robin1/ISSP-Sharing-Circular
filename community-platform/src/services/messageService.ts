import type { SendMessage } from 'oa-shared';
import { apiFetch } from 'src/utils/apiFetch';

const sendMessage = async (data: SendMessage) => {
  const formData = new FormData();

  formData.append('to', data.to);
  formData.append('message', data.message);
  formData.append('name', data.name);

  return apiFetch('/api/messages', {
    method: 'POST',
    body: formData,
  });
};

export const messageService = {
  sendMessage,
};
