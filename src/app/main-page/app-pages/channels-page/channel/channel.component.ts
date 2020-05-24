import { Component, ViewEncapsulation } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getChannelContentOverviews } from "app/store/content/selectors";
import { RootState } from "app/store/interfaces";

@Component({
  selector: "now-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ChannelComponent {
  public readonly channelOverviews$ = this.store.pipe(
    select(getChannelContentOverviews)
  );
  constructor(private readonly store: Store<RootState>) {}
}
