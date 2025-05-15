import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../states/threads/action';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListThread from '../components/theard/list-thread';

function HomePage() {
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    users = [],
    threads = [],
    authUser,
  } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVoteThread = (id) => {
    if (!authUser) {
      toast.info('Silakan login terlebih dahulu untuk menyukai thread');
      return;
    }
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVoteThread = (id) => {
    if (!authUser) {
      toast.info('Silakan login terlebih dahulu untuk memberi dislike');
      return;
    }
    dispatch(asyncDownVoteThread(id));
  };

  const onNeutralizeVoteThread = (id) => {
    if (!authUser) {
      toast.info('Silakan login untuk menghapus vote');
      return;
    }
    dispatch(asyncNeutralizeVoteThread(id));
  };

  const handleCreateThread = () => {
    if (!authUser) {
      toast.info('Silakan login terlebih dahulu untuk membuat thread');
      return;
    }
    navigate('/add');
  };

  const categories = new Set(threads.map((thread) => thread.category));
  const threadList = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  const filteredThreads = threadList.filter((thread) => {
    const matchCategory = filter ? thread.category === filter : true;
    const matchSearch = thread.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        {/* Search Input */}
        <div className="col-12 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by thread title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Kategori & Tombol Buat Thread */}
        <div className="row my-4">
          <div className="col-6">
            {Array.from(categories).map((category) => {
              if (filter === category) {
                return (
                  <span
                    key={category}
                    onClick={() => setFilter('')}
                    className="badge rounded-pill text-bg-success me-2"
                    style={{ cursor: 'pointer' }}
                  >
                    #{category}
                  </span>
                );
              }
              return (
                <span
                  key={category}
                  onClick={() => setFilter(category)}
                  className="badge rounded-pill text-bg-light me-2"
                  style={{ cursor: 'pointer' }}
                >
                  #{category}
                </span>
              );
            })}
          </div>

          <div className="col-6">
            <button
              type="button"
              className="btn btn-primary float-end"
              onClick={handleCreateThread}
            >
              Create Thread
            </button>
          </div>
        </div>

        {/* Daftar Thread */}
        <ListThread
          threads={filteredThreads}
          upVote={onUpVoteThread}
          downVote={onDownVoteThread}
          neutralizeVote={onNeutralizeVoteThread}
        />
      </div>
    </div>
  );
}

export default HomePage;
