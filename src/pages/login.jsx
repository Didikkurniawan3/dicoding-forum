import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/auth/action';
import Login from '../components/login/login';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <h3 className="text-center mb-4">Login</h3>
          <Login login={onLogin} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
