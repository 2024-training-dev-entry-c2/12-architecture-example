import { NgClass } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'lib-modal',
  imports: [NgClass,ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input({ required: true }) action!: string;
  public visible = false;

  toggle() {
    this.visible = !this.visible;
  }
}