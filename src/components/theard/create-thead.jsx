import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const CreateThread = ({ createThread }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !content) {
      toast.error('All fields are required!');
      return;
    }

    createThread({ title, category, body: content });
    toast.success('Thread created successfully');
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: '800px' }}>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label mb-1">Title</label>
            <input
              data-cy="create-title"
              className="form-control"
              placeholder="Enter thread title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label mb-1">Category</label>
            <input
              data-cy="create-category"
              className="form-control"
              placeholder="Enter category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label mb-1">Content</label>
            <textarea
              data-cy="create-content"
              className="form-control"
              placeholder="Enter thread content"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            data-cy="create-submit"
            type="submit"
            className="btn btn-success float-end"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

CreateThread.propTypes = {
  createThread: PropTypes.func.isRequired,
};

export default CreateThread;
