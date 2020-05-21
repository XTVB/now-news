import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/interfaces';
import { getPayloadForInstance } from 'app/store/utils';
import { from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
    catchError(err => {
      console.log(err);

      return [];
    })
  );

  constructor(
    private readonly actions$: Actions,
    store: Store<RootState>
  ) {
  }
}
