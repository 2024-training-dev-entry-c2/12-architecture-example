import { Component, input, output } from '@angular/core';
import { MenuItemComponent } from "../menu-item/menu-item.component";

export interface IMenuItem{
  iconSrc: string,
  menuTitle: string
  href: string
}

@Component({
  selector: 'lib-sidebar',
  imports: [MenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menus  = input<IMenuItem[]>([]);
  onClickLogout = output();

  constructor(){

  }

  logOut(){
    this.onClickLogout.emit();
  }



}
