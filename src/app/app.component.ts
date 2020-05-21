import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getLoggedIn } from './store/auth/selectors';
import { RootState } from './store/interfaces';

@Component({
  selector: 'now-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly loggedIn$ = this.store.pipe(
    select(getLoggedIn)
  );

  constructor(private readonly store: Store<RootState>) {
  }
}
