import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-informative-modal',
  imports: [],
  templateUrl: './informative-modal.component.html',
  styleUrl: './informative-modal.component.scss'
})
export class InformativeModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() showModal = false;

  closeModal() {
    this.closeModalEvent.emit(); 
  }

}
