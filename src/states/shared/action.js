import api from '../../api/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';

// Fungsi thunk untuk mengambil data users dan threads secara paralel lalu menyimpannya ke dalam state
function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndThreads };
