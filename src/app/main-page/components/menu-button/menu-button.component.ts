import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "now-menu-button",
  templateUrl: "./menu-button.component.html",
  styleUrls: ["./menu-button.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MenuButtonComponent {
  @Input()
  public svgIcon?: string;

  @Input()
  public title?: string;

  @Input()
  public selected = false;
}
