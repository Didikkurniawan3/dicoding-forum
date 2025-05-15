import { ActionType } from './action';

const threadDetailReducer = (threadDetail = null, action = {}) => {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return {
      ...threadDetail,
      ...action.payload.threadDetail,
    };

  case ActionType.UP_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: updateVoteList(
        threadDetail.upVotesBy,
        action.payload.userId,
        true,
      ),
      downVotesBy: removeVoteFromList(
        threadDetail.downVotesBy,
        action.payload.userId,
      ),
    };

  case ActionType.DOWN_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: removeVoteFromList(
        threadDetail.upVotesBy,
        action.payload.userId,
      ),
      downVotesBy: updateVoteList(
        threadDetail.downVotesBy,
        action.payload.userId,
        true,
      ),
    };

  case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: removeVoteFromList(
        threadDetail.upVotesBy,
        action.payload.userId,
      ),
      downVotesBy: removeVoteFromList(
        threadDetail.downVotesBy,
        action.payload.userId,
      ),
    };

  case ActionType.CREATE_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };

  case ActionType.UP_VOTE_COMMENT:
  case ActionType.DOWN_VOTE_COMMENT:
  case ActionType.NEUTRALIZE_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: updateVoteList(
              comment.upVotesBy,
              action.payload.userId,
              false // This ensures the user is removed (neutralized) from the upVotes list
            ),
            downVotesBy: updateVoteList(
              comment.downVotesBy,
              action.payload.userId,
              false // This ensures the user is removed (neutralized) from the downVotes list
            ),
          };
        }
        return comment;
      }),
    };


  default:
    return threadDetail;
  }
};

// Fungsi untuk memperbarui daftar suara (Upvote/Downvote)
const updateVoteList = (voteList, userId, isUpVote) => {
  if (isUpVote) {
    return voteList.includes(userId)
      ? voteList.filter((id) => id !== userId)
      : [...voteList, userId];
  } else {
    return voteList.includes(userId)
      ? voteList.filter((id) => id !== userId)
      : [...voteList, userId];
  }
};

// Fungsi untuk menghapus user dari daftar suara
const removeVoteFromList = (voteList, userId) => {
  return voteList.filter((id) => id !== userId);
};

export default threadDetailReducer;
