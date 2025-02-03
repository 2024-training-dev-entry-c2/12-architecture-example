import { Component, input, output, viewChild } from '@angular/core';
import { ModalComponent } from 'shared';
import { Imenu } from '../../../../domain/model/menu.model';

import { FormMenuComponent } from '../../forms/form-menu/form-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { Idish } from 'dish';

@Component({
  selector: 'lib-panel-menu',
  imports: [MatIconModule, FormMenuComponent, ModalComponent],
  templateUrl: './panel-menu.component.html',
  styleUrl: './panel-menu.component.scss',
})
export class PanelMenuComponent {
  public modal = viewChild<ModalComponent>('modal');
  public allDishes = input<Idish[]>([]);
  public allMenus = input<Imenu[]>([]);
  public currentMenu = input<Imenu>();
  public onCreateMenu = output<Imenu>();
  public onSelectMenu = output<number>();
  public onDeleteMenu = output<number>();

  handleSubmit(menu: Imenu) {
    this.onCreateMenu.emit(menu);
  }

  selectMenu(id: number) {
    console.log('id del menu', id);
    this.onSelectMenu.emit(id);
    this.modal().toggle();
  }

  deleteMenu(id: number) {
    this.onDeleteMenu.emit(id);
  }
}
