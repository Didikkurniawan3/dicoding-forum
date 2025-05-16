import React from 'react';
import PropTypes from 'prop-types';
import VoteButton from '../button-vote/button-vote';
import { postedAt } from '../../utils';
import parse from 'html-react-parser';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
}) {
  return (
    <div className="card mt-2 mb-2">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={owner.avatar}
            alt="User"
            width={35}
            className="rounded-circle me-3"
          />
          <div>
            <p className="mb-0 fw-bold">{owner.name}</p>
            <small className="text-muted">{postedAt(createdAt)}</small>
          </div>
        </div>
        <p className="card-text">{parse(content)}</p>

        {/* Kirim langsung upVotesBy dan downVotesBy, tidak dimodifikasi */}
        <VoteButton
          id={id}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUser={authUser}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
        />
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  ...commentShape,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export { ownerShape, commentShape };
export default CommentItem;
