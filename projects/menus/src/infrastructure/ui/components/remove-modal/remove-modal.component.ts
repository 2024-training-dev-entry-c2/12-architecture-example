import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-remove-modal',
  imports: [],
  templateUrl: './remove-modal.component.html',
  styleUrl: './remove-modal.component.scss'
})
export class RemoveModalComponent {

  @Output() closeModal = new EventEmitter<void>();
  
  @Input() menuName: string;
  
  @Output() deleteMenu = new EventEmitter<void>();

  onDelete(): void {
    this.deleteMenu.emit();
  }
  onCloseModal(): void {
    this.closeModal.emit();
  }

}


