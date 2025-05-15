/**
 * Test scenarios for asyncPopulateUsersAndThreads thunk
 *
 * - asyncPopulateUsersAndThreads thunk
 *   - should dispatch actions correctly when data fetching succeeds
 *   - should dispatch hideLoading and call alert when data fetching fails
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncPopulateUsersAndThreads } from './action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import api from '../../api/api';

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;
    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch actions correctly when data fetching succeeds', async () => {
    const mockUsers = [
      { id: 'user-1', name: 'Didik', avatar: 'https://didik.jpg' },
    ];
    const mockThreads = [
      { id: 'thread-1', title: 'Thread 1', body: 'Body', category: 'General' },
    ];

    api.getAllUsers = () => Promise.resolve(mockUsers);
    api.getAllThreads = () => Promise.resolve(mockThreads);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(mockUsers));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(mockThreads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch hideLoading and call alert when data fetching fails', async () => {
    const error = new Error('Failed to fetch data');
    api.getAllUsers = () => Promise.reject(error);
    api.getAllThreads = () => Promise.resolve([]);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(error.message);
  });
});
