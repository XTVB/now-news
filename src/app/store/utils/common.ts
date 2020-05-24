import {
  MemoizedSelectorWithProps,
  select,
  Selector,
  Store,
} from "@ngrx/store";
import { isNil } from "lodash";
import { take } from "rxjs/operators";

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
  store.pipe(select(selector, prop), take(1)).subscribe((val) => (ret = val));

  return ret as R;
}

export function getDefined<T>() {
  return isDefined as (val: Maybe<T>) => val is T;
}

export function isDefined<T>(val: Maybe<T>): val is T {
  return !isNil(val);
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Maybe<T> = T | undefined | null;

// tslint:disable-next-line: no-any
export function createUnexpectedError(err: any) {
  // tslint:disable-next-line: no-console
  console.log(err);

  return [];
}
