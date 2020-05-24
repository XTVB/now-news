import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect } from "@ngrx/effects";
import {
  createUnexpectedError,
  getPayloadForInstance,
  instanceOf,
} from "app/store/utils";
import { catchError, map, switchMap } from "rxjs/operators";
import * as actions from "./actions";
import { dummyUser } from "./interfaces";

@Injectable()
export class AuthEffects {
  @Effect()
  public readonly attemptLogin = this.actions$.pipe(
    getPayloadForInstance(actions.AttemptUserLogin),
    // Use switch map to interrupt request if retried
    switchMap(({ username, password }) => {
      // tslint:disable-next-line: possible-timing-attack
      if (username === "test" && password === "test") {
        return [true];
      } else {
        return [false];
      }
    }),
    map((succesfullLogin) =>
      succesfullLogin
        ? new actions.UserLogin(dummyUser)
        : new actions.LoginAttemptFailed()
    ),
    catchError(createUnexpectedError)
  );

  @Effect({ dispatch: false })
  public readonly loginHandler = this.actions$.pipe(
    instanceOf(actions.UserLogin),
    switchMap(() => this.router.navigateByUrl("")),
    catchError(createUnexpectedError)
  );

  @Effect({ dispatch: false })
  public readonly accessDeniedHandler = this.actions$.pipe(
    instanceOf(actions.AccessDeniedAction),
    switchMap(() => this.router.navigateByUrl("/login")),
    catchError(createUnexpectedError)
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router
  ) {}
}
