import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../../utils';
import VoteButton from '../button-vote/button-vote';
import CommentButton from '../comment/button-comment';
import { truncateText } from '../../utils';
import parse from 'html-react-parser';

function ItemThread({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
  upVote,
  downVote,
  neutralizeVote,
  authUser,
}) {
  const navigate = useNavigate();

  const onThreadClick = () => {
    navigate(`/thread/${id}`);
  };
  return (
    <div className="card mt-2 mb-2">
      <div className="card-header">
        <div className="d-flex align-items-center">
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
      </div>
      <div className="card-body">
        <figure>
          <blockquote className="blockquote">
            <h5 className="card-title" onClick={onThreadClick}>
              {title}
            </h5>
          </blockquote>
          <figcaption className="blockquote-footer">
            <small className="card-subtitle mb-2 mt-0 text-body-secondary">
              #{category}
            </small>
          </figcaption>
        </figure>
        <span className="card-text">{parse(truncateText(body, 200))}</span>
      </div>
      <div className="card-footer">
        <VoteButton
          id={id}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
          authUser={authUser}
        />
        <CommentButton
          totalComments={totalComments}
          toThreadDetail={onThreadClick}
        />
      </div>
    </div>
  );
}

const threadShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

ItemThread.propTypes = {
  ...threadShape,
};

export { threadShape };

export default ItemThread;
