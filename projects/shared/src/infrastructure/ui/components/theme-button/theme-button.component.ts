import { Component, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-theme-button',
  imports: [],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.scss'
})
export class ThemeButtonComponent {
  public text = input<string>('Enviar');
  public type = input<string>('button');
  public theme = input<'success' | 'warning' | 'danger' | 'cancel' | 'secundary'>('success');
  public hasPopup = input<boolean>(false);
  public idPopUp = input<string>();
  public form = input<FormGroup>();
  public onClick = output<void>();

  handleClick(){
    this.onClick.emit();
  }
}
