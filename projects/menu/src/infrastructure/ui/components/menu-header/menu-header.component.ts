import { Component, EventEmitter, output, Output, ViewChild } from '@angular/core';
import { HeaderComponent } from 'shared';
import { IMenu } from '../../../../domain/model/menus.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuFormComponent } from "../../forms/menu-form/menu-form.component";

@Component({
  selector: 'lib-menu-header',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, MenuFormComponent],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss'
})
export class MenuHeaderComponent {
  @Output() onSubmitMenu = new EventEmitter<IMenu>();
  @ViewChild(MenuFormComponent) menuForm!: MenuFormComponent;

  submitMenu(): void {
    if (this.menuForm && this.menuForm.form.valid) {
      const menu = this.menuForm.getFormData();
      if (menu) {
        console.log('Sending menu data:', menu);
        this.onSubmitMenu.emit(menu);
        this.menuForm.resetForm();
      }
    }
  }
}
