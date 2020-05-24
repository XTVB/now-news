import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AttemptUserLogin, LoginCredentials } from "app/store/auth/actions";
import { RootState } from "app/store/interfaces";
import { groupFor } from "app/store/utils/forms";

@Component({
  selector: "now-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginComponent {
  public readonly filterForm = groupFor<LoginCredentials>(this.fb, {
    username: "",
    password: "",
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<RootState>
  ) {}

  public submitForm() {
    const loginCredentials = this.filterForm.value || {
      username: "",
      password: "",
    };
    this.store.dispatch(new AttemptUserLogin(loginCredentials));
  }
}
