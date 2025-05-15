import React from 'react';
import PropTypes from 'prop-types';
import VoteButton from '../button-vote/button-vote';
import parse from 'html-react-parser';
import { postedAt } from '../../utils';
import { ownerShape } from '../comment/item-comment';

function DetailThread({
  id,
  title,
  body,
  category,
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
            <h5 className="card-title">{title}</h5>
          </blockquote>
          <figcaption className="blockquote-footer">
            <small className="card-subtitle mb-2 mt-0 text-body-secondary">
              #{category}
            </small>
          </figcaption>
        </figure>
        <span className="card-text">{parse(body)}</span>
      </div>
      <div className="card-footer">
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

DetailThread.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default DetailThread;
