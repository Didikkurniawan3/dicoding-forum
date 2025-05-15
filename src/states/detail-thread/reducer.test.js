/**
 * test scenarios for threadDetailReducer
 *
 * - threadDetailReducer
 *   - should return the initial state when no action is provided
 *   - should handle RECEIVE_THREAD_DETAIL action
 *   - should handle UP_VOTE_THREAD_DETAIL action
 *   - should handle DOWN_VOTE_THREAD_DETAIL action
 *   - should handle NEUTRALIZE_VOTE_THREAD_DETAIL action
 *   - should handle CREATE_COMMENT action
 *   - should handle UP_VOTE_COMMENT action
 *   - should handle DOWN_VOTE_COMMENT action
 *   - should handle NEUTRALIZE_VOTE_COMMENT action
 */

import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer', () => {
  const initialState = {
    id: 'thread-1',
    title: 'Thread 1',
    body: 'thread pertama',
    category: 'General',
    createdAt: '2025-05-14T07:00:00.000Z',
    owner: {
      id: 'users-1',
      name: 'Didik',
      avatar: 'https://didik-image-url.jpg',
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
          avatar: 'https://john-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };

  it('should return the initial state when no action is provided', () => {
    const result = threadDetailReducer(initialState, {});
    expect(result).toEqual(initialState);
  });

  it('should handle RECEIVE_THREAD_DETAIL action', () => {
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: {
          title: 'Updated Thread',
          body: 'Updated thread body',
        },
      },
    };
    const result = threadDetailReducer(initialState, action);
    expect(result.title).toEqual('Updated Thread');
    expect(result.body).toEqual('Updated thread body');
  });

  it('should handle UP_VOTE_THREAD_DETAIL action', () => {
    const action = {
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: { userId: 'users-2' },
    };
    const result = threadDetailReducer(initialState, action);
    expect(result.upVotesBy).toContain('users-2');
    expect(result.downVotesBy).toHaveLength(0);
  });

  it('should handle DOWN_VOTE_THREAD_DETAIL action', () => {
    const action = {
      type: ActionType.DOWN_VOTE_THREAD_DETAIL,
      payload: { userId: 'users-2' },
    };
    const result = threadDetailReducer(initialState, action);
    expect(result.upVotesBy).toHaveLength(0);
    expect(result.downVotesBy).toContain('users-2');
  });

  it('should handle NEUTRALIZE_VOTE_THREAD_DETAIL action', () => {
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
      payload: { userId: 'users-2' },
    };
    const initialStateWithVotes = {
      ...initialState,
      upVotesBy: ['users-2'],
      downVotesBy: [],
    };
    const result = threadDetailReducer(initialStateWithVotes, action);
    expect(result.upVotesBy).toHaveLength(0);
    expect(result.downVotesBy).toHaveLength(0);
  });

  it('should handle CREATE_COMMENT action', () => {
    const action = {
      type: ActionType.CREATE_COMMENT,
      payload: {
        comment: {
          id: 'comment-2',
          content: 'This is a new comment',
          createdAt: '2025-05-14T07:00:00.000Z',
          owner: {
            id: 'users-2',
            name: 'Didik',
            avatar: 'https://didik-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };
    const result = threadDetailReducer(initialState, action);
    expect(result.comments).toHaveLength(2);
    expect(result.comments[0].content).toEqual('This is a new comment');
  });

  it('should handle UP_VOTE_COMMENT action', () => {
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: { userId: 'users-2', commentId: 'comment-1' },
    };
    const initialStateWithComments = {
      ...initialState,
      comments: [
        {
          id: 'comment-1',
          content: 'komentar pertama',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const result = threadDetailReducer(initialStateWithComments, action);
    expect(result.comments[0].upVotesBy).toContain('users-2');
  });

  it('should handle DOWN_VOTE_COMMENT action', () => {
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: { userId: 'users-2', commentId: 'comment-1' },
    };
    const initialStateWithComments = {
      ...initialState,
      comments: [
        {
          id: 'comment-1',
          content: 'komentar pertama',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const result = threadDetailReducer(initialStateWithComments, action);
    expect(result.comments[0].downVotesBy).toContain('users-2');
  });

  it('should handle NEUTRALIZE_VOTE_COMMENT action', () => {
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_COMMENT,
      payload: { userId: 'users-2', commentId: 'comment-1' },
    };

    const initialStateWithComments = {
      ...initialState,
      comments: [
        {
          id: 'comment-1',
          content: 'komentar pertama',
          upVotesBy: ['users-2'],
          downVotesBy: ['users-2'],
        },
      ],
    };

    const result = threadDetailReducer(initialStateWithComments, action);
    expect(result.comments[0].upVotesBy).toHaveLength(0);
    expect(result.comments[0].downVotesBy).toHaveLength(0);
  });
});
