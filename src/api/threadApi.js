import { fetchWithAuth, handleResponse } from './token';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export const getAllThreads = async () => {
  const res = await fetch(`${BASE_URL}/threads`);
  const data = await handleResponse(res);
  return data.threads;
};

export const getThreadDetail = async (id) => {
  const res = await fetch(`${BASE_URL}/threads/${id}`);
  const data = await handleResponse(res);
  return data.detailThread;
};

export const createThread = async ({ title, body, category = '' }) => {
  const res = await fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, category }),
  });
  const data = await handleResponse(res);
  return data.thread;
};
