import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IMenu, IMenuRequest } from '../../../../domain/model/menu.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-create-menu-form',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './create-menu-form.component.html',
  styleUrl: './create-menu-form.component.css',
})
export class CreateMenuFormComponent {
  private menuFormBuilder = inject(FormBuilder);
  getData: IMenuRequest | any = { name: '' };
  @Output() updateMenu = new EventEmitter<IMenuRequest>();

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

  constructor(private router: Router) {}
  redirectToMenu(): void {
    setTimeout(() => this.router.navigate(['/menu']), 500);
  

  }
}
