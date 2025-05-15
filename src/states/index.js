import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './auth/reducer';
import isPreloadReducer from './isPreload/reducer';
import leaderboardsReducer from './leaderboard/reducer';
import threadReducer from './threads/reducer';
import threadDetailReducer from './detail-thread/reducer';
import usersReducer from './users/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    leaderboards: leaderboardsReducer,
    threadDetail: threadDetailReducer,
    threads: threadReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
