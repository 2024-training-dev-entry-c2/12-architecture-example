import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-button-delete',
  imports: [],
  templateUrl: './button-delete.component.html',
  styleUrl: './button-delete.component.scss'
})
export class ButtonDeleteComponent {
  @Input() id!: number;
  @Output() deleteEvent = new EventEmitter<number>();

  onDelete(): void {
    this.deleteEvent.emit(this.id);
  }
}
