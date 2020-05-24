export interface User {
  username: string;
  profileImgSrc: string;
}

export interface LoggedInUserState {
  loggedIn: true;
  user: User;
}

export interface LoggedOutUserState {
  loggedIn: false;
  user?: undefined;
}

export type AuthState = LoggedInUserState | LoggedOutUserState;

export const dummyUser: User = {
  username: "Lea Schneider",
  profileImgSrc: "/assets/images/content/face.png",
};
