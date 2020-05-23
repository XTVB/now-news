import { Component, forwardRef, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { groupFor, TypedFormGroup } from 'app/store/utils/forms';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

interface TextFieldForm {
  value: string;
}

@Component({
  selector: 'now-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor, OnDestroy {

  private readonly ngUnsubscribe = new Subject();

  public form: TypedFormGroup<TextFieldForm> = groupFor<TextFieldForm>(this.fb, {
    value: ''
  });

  @Input()
  public svgIcon?: string;

  @Input()
  public label?: string;

  @Input()
  public hide = false;

  constructor(private readonly fb: FormBuilder) {}

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public writeValue(newValue: string | undefined): void {
    this.form.reset({
      value: newValue
    });
  }

  public registerOnChange(cb: (val: string | undefined) => void): void {
    this.form.valueChanges
      .pipe(
        map(() => this.getFormValue()),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(cb);
  }

  // tslint:disable-next-line: no-empty
  public registerOnTouched(_: () => void): void {}

  protected getFormValue() {
    return this.form.value && this.form.value.value;
  }

}
