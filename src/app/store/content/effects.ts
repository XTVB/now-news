import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions } from "@ngrx/effects";

@Injectable()
export class ContentEffects {
  constructor(private readonly actions$: Actions) {}
}
