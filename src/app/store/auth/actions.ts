import { Action } from '@ngrx/store';
import { UrlTree, NavigationExtras } from '@angular/router';

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

export class AccessDeniedAction implements Action {
  public readonly type = '[Auth] Access Denied';

  constructor(public readonly url: string) {}
}
