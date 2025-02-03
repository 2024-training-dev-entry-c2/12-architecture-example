import { Component, input, output, ViewChild, viewChild } from '@angular/core';
import { IMenu } from '../../../../domain/model/menu.model';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'shared';
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';

@Component({
  selector: 'lib-menu-page',
  imports: [CommonModule, ModalComponent, MenuFormComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss'
})
export class MenuPageComponent {
  @ViewChild('modal') public modal: ModalComponent;
  public menus = input<IMenu[]>();
  public currentMenu = input<IMenu>();
  public onCreateMenu = output<{menu: IMenu; modal: ModalComponent}>();
  public onSelectMenu = output<number>();
  public onDelete = output<number>();

  handleSubmit(menu: IMenu) {
    if (menu && this.modal) {
      this.onCreateMenu.emit({menu, modal: this.modal});
      this.modal.toggle();
    }
  }

  selectMenu(id: number) {
    if (id !== null) {
      this.onSelectMenu.emit(id);
      if (this.modal) {
        this.modal.toggle();
      }
    }
  }

  deleteMenu(menuId: number): void {
    if (menuId !== null) {
      this.onDelete.emit(menuId);
    }
  }

}
