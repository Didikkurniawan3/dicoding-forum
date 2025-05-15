/**
 * Test scenarios for usersReducer
 *
 * - usersReducer
 *   - should return the initial state when given an unknown action
 *   - should return the users when given RECEIVE_USERS action
 */

import usersReducer from './reducer';
import { ActionType } from './action';

describe('usersReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the users when given RECEIVE_USERS action', () => {
    const initialState = [];
    const users = [
      { id: 'user-1', name: 'Alice' },
      { id: 'user-2', name: 'Bob' },
    ];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: { users },
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(users);
  });
});
