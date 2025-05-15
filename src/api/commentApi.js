import { fetchWithAuth, handleResponse } from './token';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export const createComment = async ({ id, content }) => {
  const res = await fetchWithAuth(`${BASE_URL}/threads/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  const data = await handleResponse(res);
  return data.comment;
};
