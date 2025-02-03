import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  RemoveButtonSharedComponent,
  ModifyButtonSharedComponent,
} from 'shared';

@Component({
  selector: 'lib-card',
  imports: [
    RouterLink,
    CommonModule,
    ModifyButtonSharedComponent,
    RemoveButtonSharedComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  public buttonModifyClick = output();
  public buttonRemoveClick = output();

  public IdMenu = input<number>();
  public title = input<string>();
  public image = input<string>();
  public link = input<string>();

  onClickModifyButton() {
    this.buttonModifyClick.emit();
  }

  onClickRemoveButton() {
    this.buttonRemoveClick.emit();
  }

  getImage() {
    return this.image;
  }

  getLink() {
    return this.link;
  }
}
