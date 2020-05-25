import { Component, ViewEncapsulation } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getUserProfileSrc } from "app/store/auth/selectors";
import { RootState } from "app/store/interfaces";

@Component({
  selector: "now-comment-input",
  templateUrl: "./comment-input.component.html",
  styleUrls: ["./comment-input.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CommentInputComponent {
  public readonly userProfile$ = this.store.pipe(select(getUserProfileSrc));

  constructor(private readonly store: Store<RootState>) {}
}
