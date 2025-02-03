import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'lib-modal',
  imports: [],
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})

export class ModalComponent {

  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Output() closeModal = new EventEmitter<void>();
  

}
