import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadShape } from './item-thread';

function ListThread({ threads, upVote, downVote, neutralizeVote }) {
  return (
    <div className="container">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
        />
      ))}
    </div>
  );
}

ListThread.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default ListThread;
