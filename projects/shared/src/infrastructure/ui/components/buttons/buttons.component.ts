import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-buttons',
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  @Input() icon!: string;
  @Input() buttonIndex!: number;
  @Input() rowIndex!: number;
  @Input() ariaLabel!: string;
  @Output() buttonClick = new EventEmitter<number>(); 

  handleClick(): void {
    this.buttonClick.emit(this.rowIndex);
  }
}
