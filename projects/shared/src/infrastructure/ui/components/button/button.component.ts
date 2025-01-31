import { Component, input, output } from '@angular/core';
import { IButton } from '../../interfaces/button.interface';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  buttonData = input<IButton>();
  clickEvent = output();

  clickedEvent() {
    this.clickEvent.emit();
  }

}