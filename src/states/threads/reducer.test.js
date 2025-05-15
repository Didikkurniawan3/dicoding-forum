/**
 * Test scenarios for threadsReducer
 *
 * - threadsReducer
 *   - should return initial state when unknown action is dispatched
 *   - should return threads when RECEIVE_THREADS action is dispatched
 *   - should prepend new thread when CREATE_THREAD action is dispatched
 *   - should handle UP_VOTE_THREAD action (add vote)
 *   - should handle UP_VOTE_THREAD action (remove vote)
 *   - should handle DOWN_VOTE_THREAD action (add vote)
 *   - should handle DOWN_VOTE_THREAD action (remove vote)
 *   - should handle NEUTRALIZE_VOTE_THREAD action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer', () => {
  const initialState = [
    {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Thread body',
      category: 'General',
      upVotesBy: [],
      downVotesBy: [],
    },
  ];

  it('should return initial state when unknown action is dispatched', () => {
    const action = { type: 'UNKNOWN' };
    const result = threadsReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('should return threads when RECEIVE_THREADS action is dispatched', () => {
    const threads = [
      { id: 'thread-2', title: 'New Thread', body: '', category: 'General', upVotesBy: [], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads },
    };
    const result = threadsReducer([], action);
    expect(result).toEqual(threads);
  });

  it('should prepend new thread when CREATE_THREAD action is dispatched', () => {
    const newThread = {
      id: 'thread-2',
      title: 'Thread 2',
      body: 'New thread body',
      category: 'News',
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.CREATE_THREAD,
      payload: { thread: newThread },
    };
    const result = threadsReducer(initialState, action);
    expect(result).toEqual([newThread, ...initialState]);
  });

  it('should handle UP_VOTE_THREAD action (add vote)', () => {
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };
    const result = threadsReducer(initialState, action);
    expect(result[0].upVotesBy).toContain('user-1');
  });

  it('should handle UP_VOTE_THREAD action (remove vote)', () => {
    const state = [
      { ...initialState[0], upVotesBy: ['user-1'], downVotesBy: ['user-1'] },
    ];
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };
    const result = threadsReducer(state, action);
    expect(result[0].upVotesBy).not.toContain('user-1');
    expect(result[0].downVotesBy).not.toContain('user-1');
  });

  it('should handle DOWN_VOTE_THREAD action (add vote)', () => {
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };
    const result = threadsReducer(initialState, action);
    expect(result[0].downVotesBy).toContain('user-2');
  });

  it('should handle DOWN_VOTE_THREAD action (remove vote)', () => {
    const state = [
      { ...initialState[0], downVotesBy: ['user-2'], upVotesBy: ['user-2'] },
    ];
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };
    const result = threadsReducer(state, action);
    expect(result[0].downVotesBy).not.toContain('user-2');
    expect(result[0].upVotesBy).not.toContain('user-2');
  });

  it('should handle NEUTRALIZE_VOTE_THREAD action', () => {
    const state = [
      { ...initialState[0], upVotesBy: ['user-3'], downVotesBy: ['user-3'] },
    ];
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-3',
      },
    };

    const result = threadsReducer(state, action);
    expect(result[0].upVotesBy).not.toContain('user-3');
    expect(result[0].downVotesBy).not.toContain('user-3');
  });
});
