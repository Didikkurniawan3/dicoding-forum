import React from 'react';
import useInput from '../../hooks/use-create';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

function Login({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Email dan password tidak boleh kosong');
      return;
    }

    try {
      await login({ email, password });
      toast.success('Login success');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            data-cy="login-email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
          />
          <div id="emailHelp" className="form-text">
            We&apos;ll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            data-cy="login-password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <label className="form-check-label">
            <div className="form-text text-inline">
              Don&apos;t have an account? &nbsp;
              <Link to="/register">Register</Link>
            </div>
          </label>
        </div>
        <div className="d-flex justify-content-end">
          <button
            data-cy="login-button"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
