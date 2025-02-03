import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IModal } from '../../interfaces/modal.interface';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  modalData = input<IModal>();
  close = output();

  showModal = false;

  onShowModal() {
      this.showModal = true;
  }

  onClose() {
    this.close.emit();
  }

}