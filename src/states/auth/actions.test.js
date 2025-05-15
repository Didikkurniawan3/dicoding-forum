/**
 * test scenarios for auth actions
 *
 * - auth actions
 *   - should create correct action for setAuthUserActionCreator
 *   - should create correct action for unsetAuthUserActionCreator
 */

import {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  ActionType,
} from './action';

vi.mock('../../api/api', () => ({
  default: {
    login: vi.fn(),
    getOwnProfile: vi.fn(),
    putAccessToken: vi.fn(),
  },
}));

vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: vi.fn(() => ({ type: 'HIDE_LOADING' })),
}));

describe('auth actions', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create correct action for setAuthUserActionCreator', () => {
    const fakeUser = { id: 'user1', name: 'Test User' };
    const action = setAuthUserActionCreator(fakeUser);
    expect(action).toEqual({
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: fakeUser },
    });
  });

  it('should create correct action for unsetAuthUserActionCreator', () => {
    const action = unsetAuthUserActionCreator();
    expect(action).toEqual({
      type: ActionType.UNSET_AUTH_USER,
      payload: { authUser: null },
    });
  });
});
