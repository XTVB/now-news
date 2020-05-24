import { Component, ViewEncapsulation } from "@angular/core";
import { select, Store } from "@ngrx/store";
import {
  getLoggedIn,
  getUserName,
  getUserProfileSrc,
} from "app/store/auth/selectors";
import { RootState } from "app/store/interfaces";

@Component({
  selector: "now-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UserInfoComponent {
  public readonly loggedIn$ = this.store.pipe(select(getLoggedIn));
  public readonly userName$ = this.store.pipe(select(getUserName));
  public readonly userProfile$ = this.store.pipe(select(getUserProfileSrc));

  constructor(private readonly store: Store<RootState>) {}
}
