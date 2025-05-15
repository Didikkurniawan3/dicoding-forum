import api from '../../api/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

// Action creator untuk menyimpan daftar user
function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

// Fungsi async untuk mendaftarkan user baru ke API
function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
    } catch (error) {
      dispatch(hideLoading());
      throw error;
    }
    dispatch(hideLoading());
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
