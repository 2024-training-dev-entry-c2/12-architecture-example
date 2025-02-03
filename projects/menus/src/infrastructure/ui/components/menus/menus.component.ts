import { Component, input, output, viewChild } from '@angular/core';
import { ModalComponent } from 'shared';
import { IMenu } from '../../../../domain/model/menus.model';
import { MenusFormComponent } from "../../forms/menus-form/menus-form.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'lib-menus',
  imports: [MenusFormComponent, ModalComponent, NgFor],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
})
export class MenusComponent {
  public modal = viewChild<ModalComponent>('modal');

  public menus = input.required<IMenu[]>();
  public onCreateMenu = output<{ menu: IMenu; modal: ModalComponent }>();
  public onSelectMenu = output<string>();
  public currentMenu = input<IMenu>();
  public onDeleteMenu = output<string>();

  handleSubmit(menu: IMenu) {
    this.onCreateMenu.emit({ menu, modal: this.modal() });
  }

  selectMenu(id: string) {
    this.onSelectMenu.emit(id);
    this.modal().toggle();
  }

  deleteMenu(id: string) {
    this.onDeleteMenu.emit(id);
  }
}
