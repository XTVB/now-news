import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserLogin } from 'app/store/auth/actions';
import { RootState } from 'app/store/interfaces';
import { groupFor } from 'app/store/utils/forms';

interface LoginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'now-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {

  public readonly filterForm = groupFor<LoginForm>(this.fb, {
    username: undefined,
    password: undefined
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<RootState>
  ) {}

  ngOnInit() {
  }

  public submitForm() {
    const loginAttempt = this.filterForm.value;
    console.log(loginAttempt);

    this.store.dispatch(new UserLogin());
  }

}
