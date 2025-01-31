import { Component, input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-modal',
  imports: [ButtonComponent, NgClass],
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
