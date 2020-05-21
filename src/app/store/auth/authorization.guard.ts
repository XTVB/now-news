import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    RouterStateSnapshot
  } from '@angular/router';
import { Store } from '@ngrx/store';
import { getState } from 'app/store/utils';
import { RootState } from '../interfaces';
import { AccessDeniedAction } from './actions';
import { getLoggedIn } from './selectors';

@Injectable()
export class AuthorizationGuard implements CanActivateChild {
    public constructor(
      public readonly store: Store<RootState>
    ) {}

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const requiresLogin = route.data.requiresLogin || false;
      if (!requiresLogin) {
        return true;
      }

      const hasAccess = getState(this.store, getLoggedIn);
      if (!hasAccess) {
        this.store.dispatch(new AccessDeniedAction(state.url));
      }

      return hasAccess;
    }
  }
