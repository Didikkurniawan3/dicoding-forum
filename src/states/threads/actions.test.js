/**
 * Test scenarios for thread thunks
 *
 * - asyncCreateThread
 *   - should dispatch actions correctly on asyncCreateThread success
 *   - should show alert and still hide loading on asyncCreateThread failure
 * - asyncUpVoteThread
 *   - should dispatch upVoteThread and call API on success
 *   - should dispatch revert downVoteThread on asyncUpVoteThread failure
 * - asyncDownVoteThread
 *   - should dispatch downVoteThread and call API on success
 *   - should dispatch downVoteThread again on asyncDownVoteThread failure
 * - asyncNeutralizeVoteThread
 *   - should dispatch neutralizeVoteThread and call API on success
 *   - should dispatch neutralizeVoteThread again on failure
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
  createThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator
} from './action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../api/api';

describe('thread thunks', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
    api._upVoteThread = api.upVoteThread;
    api._downVoteThread = api.downVoteThread;
    api._neutralizeVoteThread = api.neutralizeVoteThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    api.upVoteThread = api._upVoteThread;
    api.downVoteThread = api._downVoteThread;
    api.neutralizeVoteThread = api._neutralizeVoteThread;

    delete api._createThread;
    delete api._upVoteThread;
    delete api._downVoteThread;
    delete api._neutralizeVoteThread;
  });

  it('should dispatch actions correctly on asyncCreateThread success', async () => {
    const fakeThread = {
      id: 'thread-1',
      title: 'Test Thread',
      body: 'Test body',
      category: 'General',
    };
    api.createThread = () => Promise.resolve(fakeThread);
    const dispatch = vi.fn();

    await asyncCreateThread(fakeThread)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(createThreadActionCreator(fakeThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should show alert and still hide loading on asyncCreateThread failure', async () => {
    const error = new Error('Create thread failed');
    api.createThread = () => Promise.reject(error);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncCreateThread({ title: 'x', body: 'y' })(dispatch);

    expect(window.alert).toHaveBeenCalledWith(error.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch upVoteThread and call API on success', async () => {
    api.upVoteThread = () => Promise.resolve();
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    );
  });

  it('should dispatch revert downVoteThread on asyncUpVoteThread failure', async () => {
    api.upVoteThread = () => Promise.reject(new Error('Fail'));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });
    window.alert = vi.fn();

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(window.alert).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    );
  });

  it('should dispatch downVoteThread and call API on success', async () => {
    api.downVoteThread = () => Promise.resolve();
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    );
  });

  it('should dispatch downVoteThread again on asyncDownVoteThread failure', async () => {
    api.downVoteThread = () => Promise.reject(new Error('Fail'));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });
    window.alert = vi.fn();

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(window.alert).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    );
  });

  it('should dispatch neutralizeVoteThread and call API on success', async () => {
    api.neutralizeVoteThread = () => Promise.resolve();
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });

    await asyncNeutralizeVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      neutralizeVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    );
  });

  it('should dispatch neutralizeVoteThread again on failure', async () => {
    api.neutralizeVoteThread = () => Promise.reject(new Error('Fail'));
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 'user-1' } });
    window.alert = vi.fn();

    await asyncNeutralizeVoteThread('thread-1')(dispatch, getState);

    expect(window.alert).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      neutralizeVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' })
    );
  });
});
