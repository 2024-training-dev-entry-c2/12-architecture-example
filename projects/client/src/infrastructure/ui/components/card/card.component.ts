import { Component, input, output } from '@angular/core';
import {
  RemoveButtonSharedComponent,
  ModifyButtonSharedComponent,
} from 'shared';

@Component({
  selector: 'lib-card',
  imports: [ModifyButtonSharedComponent, RemoveButtonSharedComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public buttonModifyClick = output();
  public buttonRemoveClick = output();

  public name = input<string>();
  public email = input<string>();
  public tel = input<string>();

  onClickModifyButton() {
    this.buttonModifyClick.emit();
  }

  onClickRemoveButton() {
    this.buttonRemoveClick.emit();
  }
}
