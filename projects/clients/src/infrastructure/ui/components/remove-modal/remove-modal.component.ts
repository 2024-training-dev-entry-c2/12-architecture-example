import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-remove-modal',
  imports: [],
  templateUrl: './remove-modal.component.html',
  styleUrl: './remove-modal.component.scss'
})
export class RemoveModalComponent {
 

    @Output() closeModal = new EventEmitter<void>();

    @Input() clientName: string;
    
    @Output() deleteClient = new EventEmitter<void>();

    onDelete(): void {
      this.deleteClient.emit();
    }

    onCloseModal(): void {
      this.closeModal.emit();
    }

}
