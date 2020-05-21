export interface LoggedInUserState {
  loggedIn: true;
  // user: Oidc.User;
}
export interface LoggedOutUserState {
  loggedIn: false;
  user?: undefined;
}
export interface UnknownUserState {
  loggedIn: undefined;
}
export type AuthState = LoggedInUserState | LoggedOutUserState | UnknownUserState;

// export interface UserProfile {
//   account_code: string;
//   auth_time: number;
//   name: string;
//   preferred_username: string;
//   role: string | string[] | undefined;
//   sub: string; // this is the subject id / user id set by oauth
// }
