import { Type } from '@angular/core';
import {
  Action,
  MemoizedSelectorWithProps,
  select,
  Selector,
  Store
} from '@ngrx/store';
import { combineLatest, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map, scan, take } from 'rxjs/operators';

export function withState<S, R>(
  store: Store<S>,
  selector: Selector<S, R>,
  action: (state: R) => void
) {
  const val = getState(store, selector);

  action(val);
}

export function getState<S, R>(store: Store<S>, selector: Selector<S, R>): R;
export function getState<S, P, R>(
  store: Store<S>,
  selector: MemoizedSelectorWithProps<S, P, R>,
  prop: P
): R;
export function getState<S, P, R>(
  store: Store<S>,
  selector: Selector<S, R> | MemoizedSelectorWithProps<S, P, R>,
  prop?: P
): R {
  let ret: R | undefined;

  // ngrx guarantees to run subscribe synchronously before the next line will be executed
  store.pipe(select(selector, prop), take(1)).subscribe(val => (ret = val));

  return ret as R;
}

export function dispatchMultipleActions<T>(store: Store<T>, ...actions: Action[]) {
  for (const action of actions) {
    store.dispatch(action);
  }
}

export function actionIsType<T extends Action>(
  action: Action,
  type: Type<T>
): action is T {
  return actionOfType(action, type);
}

export function actionOfType<T extends Action>(
  action: Action,
  type: Type<T> | Type<T>[]
): boolean {
  return Array.isArray(type)
    ? type.some(t => action instanceof t)
    : action instanceof type;
}

export function syncWith<T>(
  inProgress$: Observable<boolean>
): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) =>
    combineLatest([inProgress$, source$]).pipe(
      map(([inProgress, data]) => ({ inProgress, data })),
      // let's emit the new state only when we are not in progress!
      scan((previousState, nextState) =>
        nextState.inProgress ? previousState : nextState
      ),
      map(state => state.data)
    );
}
