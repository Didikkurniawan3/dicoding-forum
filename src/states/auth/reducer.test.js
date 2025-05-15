/**
 * test scenarios for authUserReducer
 *
 * - authUserReducer
 *   - should return the initial state when given by unknown action
 *   - should return the authUser when action type is SET_AUTH_USER
 *   - should return null when action type is UNSET_AUTH_USER
 */

import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when action type is SET_AUTH_USER', () => {
    const initialState = null;
    const authUser = {
      id: 'user-1',
      name: 'John Doe',
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser,
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(authUser);
  });

  it('should return null when action type is UNSET_AUTH_USER', () => {
    const initialState = {
      id: 'user-1',
      name: 'John Doe',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});
