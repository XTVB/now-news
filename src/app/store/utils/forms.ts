import {
    AbstractControl,
    AbstractControlOptions,
    FormArray,
    FormBuilder,
    FormGroup,
    ValidatorFn
  } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Maybe, Omit } from './common';

interface TypeWithValueOf<T> {
    value: T | undefined;
  }

export interface FormStateObject<T> extends TypeWithValueOf<T> {
    disabled: boolean;
  }

export type FormStatus =
    | 'VALID' // This control has passed all validation checks.
    | 'INVALID' // This control has failed at least one validation check.
    | 'PENDING' // This control is in the midst of conducting a validation check.
    | 'DISABLED'; // This control is exempt from validation checks.

type AbstractControlPropertyWithAnyType =
    | 'value'
    | 'valueChanges'
    | 'statusChanges'
    | 'setValue'
    | 'patchValue'
    | 'reset';
type AbstractControlWithoutValue = Omit<
    AbstractControl,
    AbstractControlPropertyWithAnyType
  >;

export interface TypedAbstractControl<T>
    extends AbstractControlWithoutValue,
      TypeWithValueOf<T> {
    valueChanges: Observable<T | undefined>;
    statusChanges: Observable<FormStatus>;
    setValue(value: T | undefined, options?: {}): void;
    patchValue(value: Partial<T>, options?: {}): void;
    reset(value?: T, options?: {}): void;
  }

type FormGroupPropertyWithAnyType =
    | AbstractControlPropertyWithAnyType
    | 'controls'
    | 'registerControl'
    | 'addControl'
    | 'removeControl'
    | 'setControl'
    | 'contains'
    | 'getRawValue';
type FormGroupWithoutAnyTypes = Omit<FormGroup, FormGroupPropertyWithAnyType>;

export interface TypedFormGroup<T>
    extends FormGroupWithoutAnyTypes,
      TypedAbstractControl<T> {
    controls: { [key in keyof T]: TypedAbstractControl<T[key]> };
    registerControl<Key extends keyof T>(
      name: Key,
      control: TypedAbstractControl<T[Key]>
    ): AbstractControl;
    addControl<Key extends keyof T>(name: Key, control: TypedAbstractControl<T[Key]>): void;
    removeControl(name: keyof T): void;
    setControl<Key extends keyof T>(name: Key, control: TypedAbstractControl<T[Key]>): void;
    contains(controlName: keyof T): boolean;
    setValue(
      value: T | undefined,
      options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
      }
    ): void;
    patchValue(
      value: Partial<T>,
      options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
      }
    ): void;
    reset(
      value?: T | { [key in keyof T]?: T[key] | FormStateObject<T> },
      options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
      }
    ): void;
  }

type FormArrayPropertyWithAnyType =
    | AbstractControlPropertyWithAnyType
    | 'controls'
    | 'at'
    | 'push'
    | 'insert'
    | 'setControl'
    | 'getRawValue';
type FormArrayWithoutAnyTypes = Omit<FormArray, FormArrayPropertyWithAnyType>;

export interface TypedFormArray<T>
    extends FormArrayWithoutAnyTypes,
      Omit<TypedAbstractControl<T[]>, 'setValue' | 'patchValue' | 'reset'> {
    controls: TypedAbstractControl<T>[];
    at(index: number): TypedAbstractControl<T>;
    push(control: TypedAbstractControl<T>): void;
    insert(index: number, control: TypedAbstractControl<T>): void;
    setControl(index: number, control: TypedAbstractControl<T>): void;
    setValue(
      value: T[] | undefined,
      options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
      }
    ): void;
    patchValue(
      value: Partial<T>[],
      options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
      }
    ): void;
    reset(
      value?: (T | FormStateObject<T>)[],
      options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
      }
    ): void;
  }

export type FormConfig<T> = {
    [key in keyof T]: ControlConfig<T[key]> | TypedAbstractControl<T[key]>;
  };

export type ControlConfig<T> =
    | Maybe<T>
    | [Maybe<T>]
    | [Maybe<T>, ValidatorFn | null]
    | [Maybe<T>, AbstractControlOptions];

export function groupFor<T>(
    fb: FormBuilder,
    config: FormConfig<T>,
    options?: AbstractControlOptions
  ): TypedFormGroup<T> {
    // tslint:disable-next-line:no-any
    return fb.group(config, options) as any;
  }

export function arrayFor<T>(
    fb: FormBuilder,
    config: FormConfig<T>[] | TypedAbstractControl<T>[]
  ): TypedFormArray<T> {
    return fb.array(config);
  }

export function tryToggleControlState<T>(
    control: Maybe<AbstractControl | TypedAbstractControl<T>>,
    shouldBeEnabled: Maybe<boolean>,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) {
    if (control) {
      if (shouldBeEnabled) {
        control.enable(options);
      } else {
        control.disable(options);
      }
    }
  }

export function toggleControlsState<T>(
    form: TypedFormGroup<T>,
    names: (keyof T)[],
    shouldBeEnabled: boolean,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) {
    names
      .map(name => form.controls[name])
      .forEach(control =>
        shouldBeEnabled ? control.enable(options) : control.disable(options)
      );
  }

export function resetFormArray(formArray: FormArray, controls?: AbstractControl[]) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
    if (controls && controls.length) {
      controls.forEach(c => formArray.push(c));
    }
  }

export function getFormGroupControls(ctrl: Maybe<AbstractControl | FormGroup>) {
    if (isFormGroup(ctrl)) {
      return ctrl.controls;
    } else {
      return undefined;
    }
  }

export function isFormGroup(ctrl: Maybe<AbstractControl | FormGroup>): ctrl is FormGroup {
    return !!ctrl && !!(ctrl as FormGroup).controls;
  }

export const getRawValue$ = <T>(form: FormGroup | FormArray) =>
    form.valueChanges.pipe(
      startWith(undefined),
      map(() => form.getRawValue() as T)
    );

export const getValue$ = <T>(form: AbstractControl | TypedAbstractControl<T>) =>
    (form.valueChanges as Observable<T | undefined>).pipe(
      startWith(undefined),
      map(() => form.value as T)
    );

export const getErrors$ = <R>(form: AbstractControl | TypedAbstractControl<{}>) =>
    (form.statusChanges as Observable<{}>).pipe(
      startWith(undefined),
      map(() => form.errors as R | undefined)
    );

export const isValid$ = <T>(form: AbstractControl | TypedAbstractControl<T>) =>
    (form.statusChanges as Observable<{}>).pipe(
      startWith(undefined),
      map(() => form.valid),
      distinctUntilChanged()
    );

export function mapToRawValue<T>() {
    return (forms: Observable<FormGroup | TypedFormGroup<T> | FormArray | undefined>) =>
      forms.pipe(
        switchMap(form =>
          form ? getRawValue$<T>(form as FormGroup | FormArray) : of(undefined)
        )
      );
  }

export function mapToValue<T>() {
    return (forms: Observable<FormGroup | FormArray | undefined>) =>
      forms.pipe(switchMap(form => (form ? getValue$<T>(form) : of(undefined))));
  }
