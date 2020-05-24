import { createSelector } from "@ngrx/store";
import { RootState } from "app/store/interfaces";

const getAuthState = (state: RootState) => state.authState;

export const getLoggedIn = createSelector(
  getAuthState,
  (state) => state.loggedIn
);

export const getUser = createSelector(getAuthState, (state) => state.user);

export const getUserName = createSelector(
  getAuthState,
  (state) => state.user && state.user.username
);

export const getUserProfileSrc = createSelector(
  getAuthState,
  (state) => state.user && state.user.profileImgSrc
);
