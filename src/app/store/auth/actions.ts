import { Action } from '@ngrx/store';

// interface UserLoginPayload {
//   // user: Oidc.User;
// }

interface LoginAttemptPayload {
  username: string;
  password: string;
}

export class AttemptUserLogin implements Action {
  public readonly type = '[Auth] User Login Attempt';

  constructor(public readonly payload: LoginAttemptPayload) {}
}

export class UserLogin implements Action {
  public readonly type = '[Auth] User Login';

  constructor() {}
}

export class UserLogout implements Action {
  public readonly type = '[Auth] User Logout';

  constructor() {}
}
