import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-button-submit',
  imports: [],
  templateUrl: './button-submit.component.html',
  styleUrl: './button-submit.component.scss',
})
export class ButtonSubmitComponent {
  text = input<string>('');
}
