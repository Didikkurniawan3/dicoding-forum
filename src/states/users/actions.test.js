/**
 * Test scenarios for users actions
 *
 * - users actions
 *   - should create action to receive users
 *   - should call api.register and dispatch loading correctly on success
 *   - should call dispatch(hideLoading) and throw error on failed register
 */

import { describe, it, expect, vi } from 'vitest';
import { receiveUsersActionCreator, asyncRegisterUser } from './action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../api/api';

vi.mock('../../api/api');
vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: vi.fn(() => ({ type: 'HIDE_LOADING' })),
}));

describe('users actions', () => {
  it('should create action to receive users', () => {
    const fakeUsers = [{ id: 'user-1', name: 'John Doe' }];
    const expectedAction = {
      type: 'RECEIVE_USERS',
      payload: { users: fakeUsers },
    };

    expect(receiveUsersActionCreator(fakeUsers)).toEqual(expectedAction);
  });

  it('should call api.register and dispatch loading correctly on success', async () => {
    const dispatch = vi.fn();
    const fakeUser = { name: 'Test', email: 'test@mail.com', password: 'secret' };

    api.register.mockResolvedValueOnce(); // no return needed

    await asyncRegisterUser(fakeUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.register).toHaveBeenCalledWith(fakeUser);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should call dispatch(hideLoading) and throw error on failed register', async () => {
    const dispatch = vi.fn();
    const fakeUser = { name: 'Test', email: 'test@mail.com', password: 'secret' };
    const error = new Error('Register failed');

    api.register.mockRejectedValueOnce(error);

    await expect(asyncRegisterUser(fakeUser)(dispatch)).rejects.toThrow(error);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
