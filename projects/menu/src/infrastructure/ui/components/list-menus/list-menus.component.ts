import { NgFor } from '@angular/common';
import { Component, input, output, viewChild } from '@angular/core';
import { IMenu, IMenuFormDto } from '../../../../domain/models/menu.model';
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';
import { ModalComponent } from 'shared';

@Component({
  selector: 'lib-list-menus',
  imports: [ModalComponent, MenuFormComponent, NgFor],
  templateUrl: './list-menus.component.html',
  styleUrl: './list-menus.component.scss',
})
export class ListMenusComponent {
  public modal = viewChild<ModalComponent>('modal');
  public deleteModal = viewChild<ModalComponent>('deleteModal');
  public menus = input.required<IMenu[]>();
  public currentMenu = input<IMenu>();
  public menuToDelete: IMenu | null = null;

  public onCreateMenu = output<{
    menu: IMenu;
    modal: ModalComponent;
  }>();
  public onSelectMenu = output<number>();
  public onDeleteMenu = output<{
    menuId: number;
    modal: ModalComponent;
  }>();

  handleSubmit(formData: IMenuFormDto) {
    const menu: IMenu = {
      menuId: formData.menuId,
      name: formData.name,
      description: formData.description,
      dishes:
        this.menus()
          .find((m) => m.menuId === formData.menuId)
          ?.dishes.filter((d) => formData.dishIds.includes(d.id)) || [],
    };

    this.onCreateMenu.emit({ menu, modal: this.modal() });
  }

  selectMenu(id: number) {
    this.onSelectMenu.emit(id);
    this.modal().toggle();
  }

  handleDeleteClick(menu: IMenu) {
    this.menuToDelete = menu;
    this.deleteModal().toggle();
  }

  handleConfirmDelete() {
    if (this.menuToDelete) {
      this.onDeleteMenu.emit({
        menuId: this.menuToDelete.menuId,
        modal: this.deleteModal(),
      });
      this.menuToDelete = null;
    }
  }

  handleCancelDelete() {
    this.deleteModal().toggle();
    this.menuToDelete = null;
  }
}
