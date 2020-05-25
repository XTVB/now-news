import { Action } from "@ngrx/store";

export class ToggleChannelFollowedState implements Action {
  public readonly type = "[Content] Toggle Channel Follow State";

  constructor(public readonly id: string) {}
}

export class ToggleCommentLikedState implements Action {
  public readonly type = "[Content] Toggle Comment Follow State";

  constructor(public readonly id: string) {}
}
