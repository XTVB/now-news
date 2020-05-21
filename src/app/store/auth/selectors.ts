import { createSelector } from '@ngrx/store';
import { RootState } from 'app/store/interfaces';

const getAuthState = (state: RootState) => state.authState;

export const getLoggedIn = createSelector(getAuthState, state =>
  state.loggedIn
);
