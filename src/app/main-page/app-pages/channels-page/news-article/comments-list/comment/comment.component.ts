import { Component, Input, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { ToggleCommentLikedState } from "app/store/content/actions";
import { NewsComment } from "app/store/content/interfaces";
import { RootState } from "app/store/interfaces";
import { isDefined } from "app/store/utils";

@Component({
  selector: "now-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CommentComponent {
  @Input()
  public comment?: NewsComment;

  constructor(private readonly store: Store<RootState>) {}

  public toggleLiked(id: string) {
    if (!isDefined(this.comment)) {
      throw Error("How did you click this");
    }

    this.store.dispatch(new ToggleCommentLikedState(id));
  }
}
