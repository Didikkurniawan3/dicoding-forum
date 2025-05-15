import * as auth from './authApi';
import * as user from './userApi';
import * as thread from './threadApi';
import * as comment from './commentApi';
import * as vote from './voteApi';
import * as leaderboard from './leaderboardApi';
import { putAccessToken, getAccessToken } from './token';

const api = {
  ...auth,
  ...user,
  ...thread,
  ...comment,
  ...vote,
  ...leaderboard,
  putAccessToken,
  getAccessToken,
};

export default api;
