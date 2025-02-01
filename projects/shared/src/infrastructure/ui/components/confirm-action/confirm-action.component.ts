import { Component, output } from '@angular/core';

@Component({
  selector: 'lib-confirm-action',
  imports: [],
  templateUrl: './confirm-action.component.html',
  styleUrl: './confirm-action.component.scss'
})
export class ConfirmActionComponent {
  public clickConfirm = output<boolean>();
  public clickCancel = output<boolean>();

  public confirm() {
    this.clickConfirm.emit(true);
  }

  public cancel() {
    this.clickCancel.emit(false);
  }
}
