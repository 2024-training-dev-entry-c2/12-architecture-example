import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IMenu, IMenuRequest } from '../../../../domain/model/menu.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from 'shared';


@Component({
  selector: 'lib-create-menu-form',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './create-menu-form.component.html',
  styleUrl: './create-menu-form.component.scss',
})
export class CreateMenuFormComponent {
  private menuFormBuilder = inject(FormBuilder);
  getData: IMenuRequest | any = { name: '' };
  @Output() updateMenu = new EventEmitter<IMenuRequest>();
  @Output() closeModal = new EventEmitter<void>();
  public menuAddForm = this.menuFormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

  addMenu() {
    if (this.menuAddForm.valid) {
      this.updateMenu.emit(
        this.menuAddForm.getRawValue() as unknown as IMenuRequest
      );
      alert('Menu Created');
      this.menuAddForm.reset();
      this.redirectToMenu();
    }
  }

  redirectToMenu(): void {
    this.closeModal.emit();
  }
}
