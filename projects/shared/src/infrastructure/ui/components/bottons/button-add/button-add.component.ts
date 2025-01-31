import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lib-button-add',
  imports: [],
  templateUrl: './button-add.component.html',
  styleUrl: './button-add.component.scss'
})
export class ButtonAddComponent {
  @Output() buttonEvent = new EventEmitter<void>();

  onButtonClick() {
    this.buttonEvent.emit();
  }
}
