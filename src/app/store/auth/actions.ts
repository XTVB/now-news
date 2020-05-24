import { Action } from "@ngrx/store";
import { User } from "./interfaces";

export interface LoginCredentials {
  username: string;
  password: string;
}

export class AttemptUserLogin implements Action {
  public readonly type = "[Auth] User Login Attempt";

  constructor(public readonly payload: LoginCredentials) {}
}

export class LoginAttemptFailed implements Action {
  public readonly type = "[Auth] User Login Attempt Failed";
}

export class UserLogin implements Action {
  public readonly type = "[Auth] User Login";

  constructor(public readonly payload: User) {}
}

export class UserLogout implements Action {
  public readonly type = "[Auth] User Logout";
}

export class AccessDeniedAction implements Action {
  public readonly type = "[Auth] Access Denied";

  constructor(public readonly url: string) {}
}
