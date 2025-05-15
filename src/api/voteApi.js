import { fetchWithAuth, handleResponse } from './token';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const vote = async (url) => {
  const res = await fetchWithAuth(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await handleResponse(res);
  return data.vote;
};

export const upVoteThread = (id) => vote(`${BASE_URL}/threads/${id}/up-vote`);
export const downVoteThread = (id) =>
  vote(`${BASE_URL}/threads/${id}/down-vote`);
export const neutralizeVoteThread = (id) =>
  vote(`${BASE_URL}/threads/${id}/neutral-vote`);

export const upVoteComment = ({ threadId, commentId }) =>
  vote(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`);

export const downVoteComment = ({ threadId, commentId }) =>
  vote(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`);

export const neutralizeVoteComment = ({ threadId, commentId }) =>
  vote(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`);
