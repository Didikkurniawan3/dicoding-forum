import api from '../../api/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

// Daftar jenis aksi yang berkaitan dengan thread
const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD',
};

// Action untuk menyimpan semua thread ke dalam store
function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

// Action untuk menambahkan thread baru ke store
function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: { thread },
  };
}

// Action untuk menyimpan upvote terhadap thread
function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: { threadId, userId },
  };
}

// Action untuk menyimpan downvote terhadap thread
function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: { threadId, userId },
  };
}

// Action untuk menetralkan suara (vote) thread
function neutralizeVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: { threadId, userId },
  };
}

// Fungsi async untuk membuat thread baru dan simpan ke store
function asyncCreateThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

// Fungsi async untuk melakukan upvote thread
function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

// Fungsi async untuk melakukan downvote thread
function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

// Fungsi async untuk menetralkan vote thread
function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }),
    );
    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
};
