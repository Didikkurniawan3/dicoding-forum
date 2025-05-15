import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../states/detail-thread/action';
import DetailThread from '../components/theard/detail-thread';
import ListComment from '../components/comment/list-comment';
import CreateComment from '../components/comment/create-comment';

function DetailThreadPage() {
  const { threadId } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [threadId, dispatch]);

  const onUpVoteThreadDetail = () => {
    if (!authUser) {
      toast.info('Silakan login terlebih dahulu untuk menyukai thread');
      return;
    }
    dispatch(asyncUpVoteThreadDetail());
  };

  const onDownVoteThreadDetail = () => {
    if (!authUser) {
      toast.info('Silakan login terlebih dahulu untuk memberi dislike');
      return;
    }
    dispatch(asyncDownVoteThreadDetail());
  };

  const onNeutralizeVoteThreadDetail = () => {
    if (!authUser) {
      toast.info('Silakan login untuk menghapus vote');
      return;
    }
    dispatch(asyncNeutralizeVoteThreadDetail());
  };

  const onCommentSubmit = (content) => {
    dispatch(asyncCreateComment({ content }));
  };

  const onUpVoteComment = (id) => {
    if (!authUser) {
      toast.info('Silakan login terlebih dahulu untuk menyukai thread');
      return;
    }
    dispatch(asyncUpVoteComment(id));
  };

  const onDownVoteComment = (id) => {
    if (!authUser) {
      toast.info('Silakan login terlebih dahulu untuk memberi dislike');
      return;
    }
    dispatch(asyncDownVoteComment(id));
  };

  const onNeutralizeVoteComment = (id) => {
    if (!authUser) {
      toast.info('Silakan login untuk menghapus vote');
      return;
    }
    dispatch(asyncNeutralizeVoteComment(id));
  };

  if (threadDetail === null) {
    return null;
  }

  return (
    <div className="container">
      <DetailThread
        {...threadDetail}
        authUser={authUser?.id}
        upVote={onUpVoteThreadDetail}
        downVote={onDownVoteThreadDetail}
        neutralizeVote={onNeutralizeVoteThreadDetail}
      />

      {authUser ? (
        <CreateComment createComment={onCommentSubmit} />
      ) : (
        <p className="text-muted">Login untuk memberikan komentar.</p>
      )}

      <ListComment
        comments={threadDetail.comments}
        authUser={authUser?.id}
        upVote={onUpVoteComment}
        downVote={onDownVoteComment}
        neutralizeVote={onNeutralizeVoteComment}
      />
    </div>
  );
}

export default DetailThreadPage;
