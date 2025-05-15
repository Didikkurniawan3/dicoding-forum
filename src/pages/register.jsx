import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import Register from '../components/register/register';
import { toast } from 'react-toastify';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      toast.success('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registrasi gagal. Coba lagi.');
      // Tidak pindah ke halaman login jika gagal
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center mb-4">Register</h3>
          <Register register={onRegister} />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
