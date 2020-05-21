import stringify from 'fast-json-stable-stringify';
import { isDate, isEmpty, isNil, pick } from 'lodash';

export type Maybe<T> = T | undefined | null;
export type NotArray<T> = T extends (infer _R)[] ? never : T;
export type ItemOfArray<T> = T extends (infer _R)[] ? _R : never;

export function hash(obj: unknown): string {
    return stringify(obj);
  }

export function getDefined<T>() {
  return isDefined as (val: Maybe<T>) => val is T;
}

export function isDefined<T>(val: Maybe<T>): val is T {
  return !isNil(val);
}

export function isDefault<T>(value: Maybe<T>): boolean {
  if (typeof value === 'number') {
    // tslint:disable-next-line: strict-comparisons
    return value === 0;
  } else if (typeof value === 'boolean') {
    return !value;
  } else if (isDate(value)) {
    // lodash.isEmpty returns true for dates, which is wrong
    return false;
  }

  return isEmpty(value);
}

export function hasNotDefaultValue<T>(model: T, keys?: (keyof T)[]): boolean {
  const requestedValues = keys ? pick(model, ...keys) : model;

  return Object.values(requestedValues).some(value => !isDefault(value));
}

export function isNotNullOrEmpty(val: Maybe<string>): val is string {
  return !isNil(val) && !isEmpty(val);
}

export function areEqual<T extends {}>(obj1: T | undefined, obj2: T | undefined) {
  const hash1 = obj1 && hash(obj1);
  const hash2 = obj2 && hash(obj2);

  return hash1 === hash2;
}

export function isMoreThanOne<T>(items: T[] | undefined): boolean {
  return !!items && items.length > 1;
}

export function emptyStringToUndefined<T>(val: T | '') {
  if (val === '') {
    return undefined;
  }

  return val;
}

export function toArray<T>(val: T | T[]): T[] {
  if (Array.isArray(val)) {
    return val;
  } else {
    return [val];
  }
}

export function toApiFilterArray<T>(val?: T | T[]) {
  return val && toArray(val);
}

export function toArrayOrEmpty<T>(val: T | T[] | undefined): T[] {
  return (val && toArray(val)) || [];
}

export function asUndefinedIfEmpty<T>(val: T[] | undefined): T[] | undefined {
  return !isEmpty(val) ? val : undefined;
}

export function toApiArray<T>(val?: T | T[]) {
  return val && asUndefinedIfEmpty(toArray(val));
}

export function toBoolean(val?: string) {
  return !!val && val.toLowerCase() === 'true';
}

function getDefaultUndefinedMessage(val: null | undefined) {
  return `This shouldn't happen, the value should have been defined but instead it is ${val}`;
}

export function hasDefinedValue<T>(obj: T): boolean {
  return !!obj && Object.values(obj).some(isDefined);
}
