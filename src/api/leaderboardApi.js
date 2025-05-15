import { handleResponse } from './token';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export const getLeaderboards = async () => {
  const res = await fetch(`${BASE_URL}/leaderboards`);
  const data = await handleResponse(res);
  return data.leaderboards;
};
