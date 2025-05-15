/**
 * Test scenarios for leaderboardsReducer
 *
 * - leaderboardsReducer
 *   - should return the initial state when given unknown action
 *   - should return the leaderboards when given RECEIVE_LEADERBOARDS action
 */

import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';
import { ActionType } from './action';

describe('leaderboardsReducer', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards when given RECEIVE_LEADERBOARDS action', () => {
    const initialState = [];

    const mockLeaderboards = [
      {
        user: {
          id: 'users-1',
          name: 'Didik',
          avatar: 'https://example.com/avatar.jpg',
        },
        score: 150,
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane',
          avatar: 'https://example.com/avatar2.jpg',
        },
        score: 100,
      },
    ];

    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: mockLeaderboards,
      },
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(mockLeaderboards);
  });
});
