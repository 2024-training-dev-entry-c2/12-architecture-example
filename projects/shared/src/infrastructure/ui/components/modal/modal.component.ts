import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { ButtonCloseComponent } from "../bottons/button-close/button-close.component";

@Component({
  selector: 'lib-modal',
  imports: [CommonModule, ButtonCloseComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  public action = input.required<string>();
  public visible = false;

  toggle() {
    this.visible = !this.visible;
  }
}
