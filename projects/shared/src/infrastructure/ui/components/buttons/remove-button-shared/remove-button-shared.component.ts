import { Component, output } from '@angular/core';

@Component({
  selector: 'lib-remove-button-shared',
  imports: [],
  templateUrl: './remove-button-shared.component.html',
  styleUrl: './remove-button-shared.component.scss'
})
export class RemoveButtonSharedComponent {
  public buttonClicked  = output();

  buttonIsClicked(){
    this.buttonClicked.emit();
  }
}
