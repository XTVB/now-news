import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/interfaces';
import { UserLogin } from 'app/store/auth/actions';

declare type SocialLoginType = 'google' | 'facebook';

@Component({
  selector: 'now-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SocialLoginComponent {

  constructor(private readonly store: Store<RootState>) {
  }

  public attemptLogin(type: SocialLoginType) {
    // TOOO implement social login

    console.log(type);
    this.store.dispatch(new UserLogin());
  }

}
