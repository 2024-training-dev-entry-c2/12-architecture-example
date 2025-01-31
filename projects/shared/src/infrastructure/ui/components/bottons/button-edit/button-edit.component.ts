import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-button-edit',
  imports: [],
  templateUrl: './button-edit.component.html',
  styleUrl: './button-edit.component.scss'
})
export class ButtonEditComponent {
  @Input() id!: number;
  @Output() editEvent = new EventEmitter<number>();

  onEdit(): void {
    this.editEvent.emit(this.id);
  }
}
