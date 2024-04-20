import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-card-header',
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.css',
})
export class CardHeaderComponent {
  @Input()
  public title!: string;
}
