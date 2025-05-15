import React from 'react';
import PropTypes from 'prop-types';
import { userShape } from '../header/header';

function Leaderboard({ leaderboards }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {leaderboards.map(({ user, score }, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src={user.avatar}
                  alt="User"
                  width={35}
                  className="rounded-circle me-3"
                />
                <div>
                  <p className="mb-0 fw-bold">{user.name}</p>
                </div>
              </div>
            </td>
            <td>{score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const leaderboardShape = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

Leaderboard.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardShape)).isRequired,
};

export default Leaderboard;
