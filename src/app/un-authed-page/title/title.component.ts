import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'now-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TitleComponent {

  @Input()
  public title?: string;

  @Input()
  public subTitle?: string;
}
