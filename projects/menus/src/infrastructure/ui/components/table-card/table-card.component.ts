import { Component, computed, input, output } from '@angular/core';

import { IMenu, IMenuRequest } from '../../../../domain/model/menu.model';
import { ButtonsComponent, TableComponent } from 'shared';
import { Router } from '@angular/router';
import { CreateMenuFormComponent } from '../../forms/create-menu-form/create-menu-form.component';
import { UpdateMenuFormComponent } from '../../forms/update-menu-form/update-menu-form.component';

@Component({
  selector: 'lib-table-card',
  imports: [ButtonsComponent, CreateMenuFormComponent, UpdateMenuFormComponent],
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.scss',
})
export class TableCardComponent {
  public menu = input.required<IMenu[]>();
  public currentMenu = input<IMenu>();
  public createMenuData = output<IMenuRequest>();
  public updateMenuData = output<{ menu: IMenuRequest; id: number }>();
  public onSelectMenu = output<number>();
  public selectMenu = output<{ id: number; name: string }>();
  public getTabs = computed(() => {
    if (!this.menu()) {
      console.warn('menu is undefined');
      return [];
    }
    return this.menu().map((menu) => ({ id: menu.id, name: menu.name }));
  });
  public menuId: number = 0;
  showModal = false;
  showModalUpdate = false;
  public deleteMenuData = output<number>();
  public deleteDishData = output<number>();
  activeTab = 0;
  images = [
    'assets/icons/form-svgrepo-com.svg#icon-delete',
    'assets/icons/form-svgrepo-com.svg#icon-update',
  ];

  selectTab(index: number, menuId: any): void {
    this.activeTab = index;
    this.selectMenu.emit({ id: menuId.id, name: menuId.name });
  }
  deleteMenu(id: number) {
    this.deleteMenuData.emit(id);
  }

  redirectToMenu(): void {
    this.showModal = true;
  }
  createMenu(menu: IMenuRequest) {
    this.createMenuData.emit(menu);
  }
  handleUpdateMenu(menu: IMenuRequest) {
    this.updateMenuData.emit({ menu, id: this.menuId });
  }

  redirectToMenuId(id: number): void {
    this.menuId = id;
    this.onSelectMenu.emit(id);
    this.showModalUpdate = true;
  }
  closeModal() {
    this.showModal = false;
    this.showModalUpdate = false;
  }
}
