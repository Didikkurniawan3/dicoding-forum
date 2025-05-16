import React from 'react';
import PropTypes from 'prop-types';

function VoteButton({
  id,
  upVotesBy,
  downVotesBy,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  return (
    <>
      {/* Tombol UpVote */}
      {isUpVoted ? (
        <button
          type="button"
          className="btn btn-sm btn-primary me-2"
          onClick={() => neutralizeVote(id)}
        >
          <i className="bi bi-hand-thumbs-up-fill"></i> {upVotesBy.length}
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-sm btn-outline-primary me-2"
          onClick={() => upVote(id)}
        >
          <i className="bi bi-hand-thumbs-up"></i> {upVotesBy.length}
        </button>
      )}

      {/* Tombol DownVote */}
      {isDownVoted ? (
        <button
          type="button"
          className="btn btn-sm btn-danger me-2"
          onClick={() => neutralizeVote(id)}
        >
          <i className="bi bi-hand-thumbs-down-fill"></i> {downVotesBy.length}
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-sm btn-outline-danger me-2"
          onClick={() => downVote(id)}
        >
          <i className="bi bi-hand-thumbs-down"></i> {downVotesBy.length}
        </button>
      )}
    </>
  );
}

VoteButton.propTypes = {
  id: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default VoteButton;
