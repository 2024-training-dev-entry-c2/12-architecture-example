import { CommonModule } from '@angular/common';
import { Component, inject, input, output, viewChild } from '@angular/core';
import { IMenu } from '../../../../domain/model/menu.model';
import { Router } from '@angular/router';
import { ModalComponent } from 'shared';

@Component({
  selector: 'lib-menu-table',
  imports: [CommonModule],
  templateUrl: './menu-table.component.html',
  styleUrl: './menu-table.component.scss'
})
export class MenuTableComponent {
  public modal = viewChild<ModalComponent>('modal');
  public menus = input<IMenu[]>();
  public currentMenu = input<IMenu>();
  public onCreateMenu = output<{menu: IMenu; modal: ModalComponent}>();
  public onSelectMenu = output<number>();
  public onDelete = output<number>();

  handleSubmir(menu: IMenu) {
    this.onCreateMenu.emit({menu, modal: this.modal()});
  }

  selectMenu(id: number) {
    this.onSelectMenu.emit(id);
    this.modal().toggle();
  }

  deleteMenu(menuId: number): void {
    this.onDelete.emit(menuId);
  }


}
