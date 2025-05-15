import { fetchWithAuth, handleResponse } from './token';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export const getAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  const data = await handleResponse(res);
  return data.users;
};

export const getOwnProfile = async () => {
  const res = await fetchWithAuth(`${BASE_URL}/users/me`);
  const data = await handleResponse(res);
  return data.user;
};
