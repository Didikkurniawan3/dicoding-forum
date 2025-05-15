/**
 * test scenarios for asyncReceiveThreadDetail thunk
 *
 * - asyncReceiveThreadDetail thunk
 *   - should dispatch actions correctly when data fetching is successful
 *   - should dispatch actions and trigger an alert when data fetching fails
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { asyncReceiveThreadDetail, receiveThreadDetailActionCreator } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../api/api';

const mockThreadDetails = {
  id: 'thread-1',
  title: 'Thread 1',
  body: 'thread pertama',
  category: 'General',
  createdAt: '2025-05-14T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'Didik',
    avatar: 'https://didik-image-url.jpg'
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'komentar pertama',
      createdAt: '2025-05-14T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John',
        avatar: 'https://john-image-url.jpg'
      },
      upVotesBy: [],
      downVotesBy: []
    }
  ]
};

const mockErrorResponse = new Error('Ups, Something went wrong!');

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;
    delete api._getThreadDetail;
  });

  it('should dispatch actions correctly when data fetching is successful', async () => {
    api.getThreadDetail = () => Promise.resolve(mockThreadDetails);
    const dispatch = vi.fn();

    await asyncReceiveThreadDetail()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(mockThreadDetails));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and trigger an alert when data fetching fails', async () => {
    api.getThreadDetail = () => Promise.reject(mockErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncReceiveThreadDetail()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(mockErrorResponse.message);
  });
});
