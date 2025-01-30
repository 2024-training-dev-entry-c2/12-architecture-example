import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-delete-card',
  imports: [FontAwesomeModule],
  templateUrl: './delete-card.component.html',
  styleUrl: './delete-card.component.scss',
})
export class DeleteCardComponent {
  faX = faX;
  faExclamationCircle = faExclamationCircle;

  @Input() public selectedId!: number;
  @Input() public entityName!: string;
  @Output() public closeModal = new EventEmitter<void>();
  @Output() public onDelete = new EventEmitter<number>();

  close(): void {
    this.closeModal.emit();
  }

  delete(): void {
    this.onDelete.emit(this.selectedId);
  }
}
