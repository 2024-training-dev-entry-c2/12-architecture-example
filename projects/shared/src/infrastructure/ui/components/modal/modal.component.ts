import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  public open = input<boolean>();
  public close = output<boolean>();
  public message = '';

  public closeModal() {
    this.close.emit(false);
  }
}
