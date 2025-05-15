/**
 * Test scenarios for leaderboards action creators and async thunk
 *
 * - receiveLeaderboardsActionCreator
 *   - should create correct action for receiveLeaderboardsActionCreator
 *
 * - asyncPopulateLeaderboards thunk
 *   - should dispatch action correctly when fetching leaderboards succeeds
 *   - should dispatch action and call alert when fetching leaderboards fails
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncPopulateLeaderboards,
} from './action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../api/api';

describe('leaderboards action creator', () => {
  it('should create correct action for receiveLeaderboardsActionCreator', () => {
    const mockLeaderboards = [
      {
        user: {
          id: 'users-1',
          name: 'Didik',
          email: 'didik@example.com',
          avatar: 'https://example.com/avatar.jpg',
        },
        score: 100,
      },
    ];

    const expectedAction = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: mockLeaderboards,
      },
    };

    expect(receiveLeaderboardsActionCreator(mockLeaderboards)).toEqual(expectedAction);
  });
});

describe('asyncPopulateLeaderboards thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;
    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when fetching leaderboards succeeds', async () => {
    const mockLeaderboards = [
      {
        user: {
          id: 'users-1',
          name: 'Didik',
          avatar: 'https://example.com/avatar.jpg',
        },
        score: 120,
      },
    ];
    api.getLeaderboards = () => Promise.resolve(mockLeaderboards);
    const dispatch = vi.fn();

    await asyncPopulateLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(mockLeaderboards));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when fetching leaderboards fails', async () => {
    // Arrange
    const fakeError = new Error('Failed to fetch leaderboards');
    api.getLeaderboards = () => Promise.reject(fakeError);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncPopulateLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});
