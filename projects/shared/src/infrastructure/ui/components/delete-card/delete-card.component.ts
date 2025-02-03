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
  @Input() public index: number = 0;
  @Input() public entityName!: string;
  @Output() public onDelete = new EventEmitter<{ id: number; index: number }>();

  @ViewChild('deleteCard') deleteCard!: ElementRef<HTMLDialogElement>;

  delete(): void {
    this.onDelete.emit({ id: this.selectedId, index: this.index });
    this.deleteCard.nativeElement.close();
  }

  open() {
    this.deleteCard.nativeElement.showModal();
  }

  close() {
    this.deleteCard.nativeElement.close();
  }
}
