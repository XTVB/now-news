import { Component, Input, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { ToggleChannelFollowedState } from "app/store/content/actions";
import { ContentOverview } from "app/store/content/interfaces";
import { RootState } from "app/store/interfaces";
import { isDefined } from "app/store/utils";

@Component({
  selector: "now-content-overview",
  templateUrl: "./content-overview.component.html",
  styleUrls: ["./content-overview.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContentOverviewComponent {
  @Input()
  public contentOverview?: ContentOverview;

  constructor(private readonly store: Store<RootState>) {}

  public toggleSelected(id: string) {
    if (!isDefined(this.contentOverview)) {
      throw Error("How did you click this");
    }

    this.store.dispatch(new ToggleChannelFollowedState(id));
  }
}
