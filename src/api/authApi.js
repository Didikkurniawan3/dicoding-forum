import { handleResponse } from './token';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export const register = async ({ name, email, password }) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await handleResponse(res);
  return data.user;
};

export const login = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(res);
  return data.token;
};
