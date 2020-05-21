import { Action } from '@ngrx/store';
import * as actions from './actions';
import { AuthState } from './interfaces';

const initialState: AuthState = {
  loggedIn: false
};

export function authReducer(state = initialState, action: Action): AuthState {
  if (action instanceof actions.UserLogin) {
    return {
      ...state,
      loggedIn: true
    };
  }

  if (action instanceof actions.UserLogout) {
    return {
      ...state,
      loggedIn: false
    };
  }

  return state;
}
