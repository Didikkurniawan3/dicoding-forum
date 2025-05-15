import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

function Header({ authUser, logout }) {
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h3 className="text-center">
            <b className="text-primary">Forum</b>App
          </h3>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-3">
            <li className="nav-item">
              <Link to="/" className="nav-link text-decoration-none">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/leaderboard" className="nav-link text-decoration-none">
                Leaderboard
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {!authUser && !isAuthPage && (
              <li className="nav-item">
                <Link to="/login" className="btn btn-outline-primary">
                  Login
                </Link>
              </li>
            )}

            {authUser && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={authUser.avatar}
                    alt="User"
                    width={30}
                    className="rounded-circle me-3"
                  />
                  <span>{authUser.name}</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={logout}
                    >
                      <img
                        src="/assets/icons/logout-2-svgrepo-com.svg"
                        alt="Logout Icon"
                        width="20"
                        height="20"
                      />
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Header.propTypes = {
  authUser: PropTypes.shape(userShape),
  logout: PropTypes.func.isRequired,
};

export { userShape };
export default Header;
