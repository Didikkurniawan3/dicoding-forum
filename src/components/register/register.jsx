import React from 'react';
import useInput from '../../hooks/use-create';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Register({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <div className="card mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            value={name}
            onChange={onNameChange}
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
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
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="form-text text-inline">
            Have an account? &nbsp;
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => register({ name, email, password })}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default Register;
