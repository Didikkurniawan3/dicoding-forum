import React from 'react';
import useInput from '../../hooks/use-create';
import PropTypes from 'prop-types';

function CreateComment({ createComment }) {
  const [comment, onCommentChange, setComment] = useInput('');

  const onCommentSubmit = () => {
    if (!comment.trim()) return;
    createComment(comment);
    setComment('');
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="form-floating">
          <textarea
            data-cy="comment-input"
            className="form-control"
            placeholder="Comment"
            value={comment}
            onChange={onCommentChange}
          />
          <label>Comments</label>
        </div>
        <button
          data-cy="comment-submit"
          className="btn btn-success float-end mt-2"
          onClick={onCommentSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
}

CreateComment.propTypes = {
  createComment: PropTypes.func.isRequired,
};

export default CreateComment;
