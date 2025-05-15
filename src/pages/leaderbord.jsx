import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateLeaderboards } from '../states/leaderboard/action';
import LeaderboardTable from '../components/leaderboard/leaderboard';

function LeaderboardPage() {
  const dispatch = useDispatch();

  const { leaderboards = [] } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <h3 className="text-center m-4">Leaderboard</h3>
          <LeaderboardTable leaderboards={leaderboards} />
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
