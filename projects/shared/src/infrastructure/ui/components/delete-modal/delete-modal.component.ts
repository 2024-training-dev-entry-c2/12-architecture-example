import { Component, input, output, viewChild } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { ThemeButtonComponent } from "../theme-button/theme-button.component";

@Component({
  selector: 'lib-delete-modal',
  imports: [ModalComponent, ThemeButtonComponent],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  public item = input<string>();
  public onDelete = output<number>();
  modal = viewChild<ModalComponent>('modal');
  private id : number;

  openDeleteModal(id: number) {
    this.id = id;
    this.modal().toggle();
  }

  onClickDelete(){
    this.onDelete.emit(this.id);
    this.modal().toggle();
  }

  onClickCancel(){
    this.modal().toggle();
    this.id = null;
  }
}
