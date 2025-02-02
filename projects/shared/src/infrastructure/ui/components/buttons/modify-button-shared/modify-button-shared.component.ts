import { Component, output } from '@angular/core';

@Component({
  selector: 'lib-modify-button-shared',
  imports: [],
  templateUrl: './modify-button-shared.component.html',
  styleUrl: './modify-button-shared.component.scss',
})
export class ModifyButtonSharedComponent {
  public buttonClicked = output();

  buttonIsClicked() {
    this.buttonClicked.emit();
  }
}
