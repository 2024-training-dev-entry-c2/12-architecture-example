import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faX,
  faTrash,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-delete-card',
  imports: [FontAwesomeModule],
  templateUrl: './delete-card.component.html',
  styleUrl: './delete-card.component.scss',
})
export class DeleteCardComponent {
  faX = faX;
  faTrash = faTrash;
  faExclamationCircle = faExclamationCircle;

  @Input() public selectedId!: number;
  @Input() public entityName!: string;
  @Output() public closeModal = new EventEmitter<void>();
  @Output() public onDelete = new EventEmitter<number>();

  delete(): void {
    this.onDelete.emit(this.selectedId);
    this.deleteCard.nativeElement.close();
  }

  @ViewChild('deleteCard') deleteCard!: ElementRef<HTMLDialogElement>;

  open() {
    this.deleteCard.nativeElement.showModal();
  }

  close() {
    this.deleteCard.nativeElement.close();
  }
}
