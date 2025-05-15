import api from '../../api/api';
import { setAuthUserActionCreator } from '../auth/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

// Action Creator untuk mengubah status preload
function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: { isPreload },
  };
}

// Fungsi async untuk proses preload data pengguna
function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const authUser = await api.getOwnProfile();
        dispatch(setAuthUserActionCreator(authUser));
      }
    } catch (error) {
      console.error('Preload error:', error.message);
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoading());
    }
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
