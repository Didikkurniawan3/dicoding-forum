import api from '../../api/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

// Jenis-jenis aksi terkait detail thread dan komentar
const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

// --- Action Creator ---

const receiveThreadDetailActionCreator = (threadDetail) => ({
  type: ActionType.RECEIVE_THREAD_DETAIL,
  payload: { threadDetail },
});

const upVoteThreadDetailActionCreator = (userId) => ({
  type: ActionType.UP_VOTE_THREAD_DETAIL,
  payload: { userId },
});

const downVoteThreadDetailActionCreator = (userId) => ({
  type: ActionType.DOWN_VOTE_THREAD_DETAIL,
  payload: { userId },
});

const neutralizeVoteThreadDetailActionCreator = (userId) => ({
  type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
  payload: { userId },
});

const createCommentActionCreator = (comment) => ({
  type: ActionType.CREATE_COMMENT,
  payload: { comment },
});

const upVoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.UP_VOTE_COMMENT,
  payload: { commentId, userId },
});

const downVoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.DOWN_VOTE_COMMENT,
  payload: { commentId, userId },
});

const neutralizeVoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.NEUTRALIZE_VOTE_COMMENT,
  payload: { commentId, userId },
});

// --- Async Thunk Action ---

// Ambil detail thread berdasarkan ID
const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const threadDetail = await api.getThreadDetail(threadId);
    dispatch(receiveThreadDetailActionCreator(threadDetail));
  } catch (error) {
    alert(error.message);
  }
  dispatch(hideLoading());
};

// Voting untuk thread
const asyncUpVoteThreadDetail = () => async (dispatch, getState) => {
  const { threadDetail, authUser } = getState();
  dispatch(upVoteThreadDetailActionCreator(authUser.id));
  try {
    await api.upVoteThread(threadDetail.id);
  } catch (error) {
    alert(error.message);
  }
};

const asyncDownVoteThreadDetail = () => async (dispatch, getState) => {
  const { threadDetail, authUser } = getState();
  dispatch(downVoteThreadDetailActionCreator(authUser.id));
  try {
    await api.downVoteThread(threadDetail.id);
  } catch (error) {
    alert(error.message);
  }
};

const asyncNeutralizeVoteThreadDetail = () => async (dispatch, getState) => {
  const { threadDetail, authUser } = getState();
  dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
  try {
    await api.neutralizeVoteThread(threadDetail.id);
  } catch (error) {
    alert(error.message);
  }
};

// Komentar baru pada thread
const asyncCreateComment =
  ({ content }) =>
    async (dispatch, getState) => {
      dispatch(showLoading());
      const { threadDetail } = getState();
      try {
        const comment = await api.createComment({ id: threadDetail.id, content });
        dispatch(createCommentActionCreator(comment));
      } catch (error) {
        alert(error.message);
      }
      dispatch(hideLoading());
    };

// Voting komentar
const asyncUpVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  dispatch(upVoteCommentActionCreator(commentId, authUser.id));
  try {
    await api.upVoteComment({ threadId: threadDetail.id, commentId });
  } catch (error) {
    alert(error.message);
  }
};

const asyncDownVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  dispatch(downVoteCommentActionCreator(commentId, authUser.id));
  try {
    await api.downVoteComment({ threadId: threadDetail.id, commentId });
  } catch (error) {
    alert(error.message);
  }
};

const asyncNeutralizeVoteComment =
  (commentId) => async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(neutralizeVoteCommentActionCreator(commentId, authUser.id));
    try {
      await api.neutralizeVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
    }
  };

// --- Ekspor Semua ---
export {
  ActionType,
  receiveThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
};
