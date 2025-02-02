import { Component, input, output, viewChild } from '@angular/core';
import { ModalComponent } from 'shared';
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';
import { CurrencyPipe, NgFor } from '@angular/common';
import { IMenu } from '../../../../domain/models/menu.model';

@Component({
  selector: 'lib-list-menues',
  imports: [ModalComponent, MenuFormComponent, NgFor, CurrencyPipe],
  templateUrl: './list-menus.component.html',
  styleUrl: './list-menus.component.scss',
})
export class ListMenusComponent {
  public modal = viewChild<ModalComponent>('modal');
  public deleteModal = viewChild<ModalComponent>('deleteModal');
  public menues = input.required<IMenu[]>();
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

  handleSubmit(menu: IMenu) {
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
