import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/interfaces';
import { getPayloadForInstance, instanceOf } from 'app/store/utils';
import { from } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as actions from './actions';

@Injectable()
export class AuthEffects {
  @Effect()
  public readonly attemptLogin = this.actions$.pipe(
    getPayloadForInstance(actions.AttemptUserLogin),
    switchMap(({username, password}) =>
      // Dummy server API call to authenticate credentials
      from(new Promise<boolean>((resolve, reject) => {
        // tslint:disable-next-line: possible-timing-attack
        if (username === 'TestUser' && password === 'test') {
            resolve(true);
        } else {
            reject(false);
        }
      }))
    ),
    // tslint:disable-next-line: no-console
    map(x => console.log(x)

    ),
    catchError(createUnexpectedError)
  );

  @Effect({ dispatch: false })
  public readonly loginHandler = this.actions$.pipe(
    instanceOf(actions.UserLogin),
    switchMap(() =>  this.router.navigateByUrl('')),
    catchError(createUnexpectedError)
  );

  @Effect({ dispatch: false })
  public readonly accessDeniedHandler = this.actions$.pipe(
    instanceOf(actions.AccessDeniedAction),
    switchMap(() =>  this.router.navigateByUrl('/login')),
    catchError(createUnexpectedError)
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    store: Store<RootState>
  ) {
  }
}

// TODO
function createUnexpectedError(err: any) {
  console.log(err);

  return [];
}
