import { Type } from '@angular/core';
import { Action } from '@ngrx/store';
import { OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface ActionWithPayload<T> extends Action {
    payload: T;
  }

export function getPayloadForInstance<T>(
    type: Type<ActionWithPayload<T>>
): OperatorFunction<Action, T> {
    return source => source.pipe(instanceOf(type), getPayload());
}

export function instanceOf<T, TSource = Action>(
    type: Type<T>
): OperatorFunction<TSource, T> {
    return source =>
        source.pipe(filter((val => val instanceof type) as (val: TSource | T) => val is T));
}

export function getPayload<T>(): OperatorFunction<{ payload: T }, T> {
    return source => source.pipe(map(val => val.payload));
}
