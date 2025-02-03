import { Component, input, output } from '@angular/core';
import {
  RemoveButtonSharedComponent,
  ModifyButtonSharedComponent,
} from 'shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-card',
  imports: [
    ModifyButtonSharedComponent,
    RemoveButtonSharedComponent,
    CommonModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  public buttonModifyClick = output();
  public buttonRemoveClick = output();

  public precio = input<number>();
  public idCliente = input<number>();

  onClickModifyButton() {
    this.buttonModifyClick.emit();
  }

  onClickRemoveButton() {
    this.buttonRemoveClick.emit();
  }
}
