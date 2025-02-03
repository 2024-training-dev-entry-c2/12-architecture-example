import { Component, input, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMenu } from '../../../../domain/model/menu.model';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'lib-get-all-menu-comp',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './get-all-menu-comp.component.html',
  styleUrl: './get-all-menu-comp.component.scss'
})
export class GetAllMenuCompComponent {
  menus = input<IMenu[]>();
  items = input<string[]>();
  public onDeleteMenu = output<number>();
  public onUpdateMenu = output<number>();

  deleteMenu(id: number) {
    this.onDeleteMenu.emit(id);
  }

  updateMenu(id: number) {
    this.onUpdateMenu.emit(id);
  }
}
