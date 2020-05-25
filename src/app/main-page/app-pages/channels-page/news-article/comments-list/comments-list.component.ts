import { Component, ViewEncapsulation } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getUserProfileSrc } from "app/store/auth/selectors";
import {
  getDisplayedNewsComments,
  getNewsCommentsAmount,
} from "app/store/content/selectors";
import { RootState } from "app/store/interfaces";

@Component({
  selector: "now-comments-list",
  templateUrl: "./comments-list.component.html",
  styleUrls: ["./comments-list.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CommentsListComponent {
  public readonly commentsList$ = this.store.pipe(
    select(getDisplayedNewsComments)
  );
  public readonly commentsCount$ = this.store.pipe(
    select(getNewsCommentsAmount)
  );

  constructor(private readonly store: Store<RootState>) {}
}
