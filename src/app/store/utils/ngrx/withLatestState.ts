import { Selector, Store } from '@ngrx/store';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { getState } from './common';

export function withLatestState<T, S, R1>(
  store: Store<S>,
  s1: Selector<S, R1>
): OperatorFunction<T, [T, R1]>;
export function withLatestState<T, S, R1, R2>(
  store: Store<S>,
  s1: Selector<S, R1>,
  s2: Selector<S, R2>
): OperatorFunction<T, [T, R1, R2]>;
export function withLatestState<T, S, R1, R2, R3>(
  store: Store<S>,
  s1: Selector<S, R1>,
  s2: Selector<S, R2>,
  s3: Selector<S, R3>
): OperatorFunction<T, [T, R1, R2, R3]>;
export function withLatestState<T, S, R1, R2, R3, R4>(
  store: Store<S>,
  s1: Selector<S, R1>,
  s2: Selector<S, R2>,
  s3: Selector<S, R3>,
  s4: Selector<S, R4>
): OperatorFunction<T, [T, R1, R2, R3, R4]>;
export function withLatestState<T, S, R1, R2, R3, R4, R5>(
  store: Store<S>,
  s1: Selector<S, R1>,
  s2: Selector<S, R2>,
  s3: Selector<S, R3>,
  s4: Selector<S, R4>,
  s5: Selector<S, R5>
): OperatorFunction<T, [T, R1, R2, R3, R4, R5]>;
export function withLatestState<T, S, R1, R2, R3, R4, R5, R6>(
  store: Store<S>,
  s1: Selector<S, R1>,
  s2: Selector<S, R2>,
  s3: Selector<S, R3>,
  s4: Selector<S, R4>,
  s5: Selector<S, R5>,
  s6: Selector<S, R6>
): OperatorFunction<T, [T, R1, R2, R3, R4, R5, R6]>;
export function withLatestState<T, S, R1, R2, R3, R4, R5, R6, R7>(
  store: Store<S>,
  s1: Selector<S, R1>,
  s2: Selector<S, R2>,
  s3: Selector<S, R3>,
  s4: Selector<S, R4>,
  s5: Selector<S, R5>,
  s6: Selector<S, R6>,
  s7: Selector<S, R7>
): OperatorFunction<T, [T, R1, R2, R3, R4, R5, R6, R7]>;
export function withLatestState<T, S, R1, R2, R3, R4, R5, R6, R7, R8>(
  store: Store<S>,
  s1: Selector<S, R1>,
  s2: Selector<S, R2>,
  s3: Selector<S, R3>,
  s4: Selector<S, R4>,
  s5: Selector<S, R5>,
  s6: Selector<S, R6>,
  s7: Selector<S, R7>,
  s8: Selector<S, R8>
): OperatorFunction<T, [T, R1, R2, R3, R4, R5, R6, R7, R8]>;
export function withLatestState<T, S>(
  store: Store<S>,
  ...selectors: Selector<S, unknown>[]
): OperatorFunction<T, [T, ...unknown[]]> {
  return (source$: Observable<T>) =>
    source$.pipe(
      map(value => {
        const states = selectors.map(selector => getState(store, selector));

        return [value, ...states] as [T, ...unknown[]];
      })
    );
}
