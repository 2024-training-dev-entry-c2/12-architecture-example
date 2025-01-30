import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  public navItems: any = [
    {
      name: 'Home',
      icon: 'home',
      path: '/',
    },
    {
      name: 'Clientes',
      icon: 'group',
      path: '/clientes',
    },
    {
      name: 'Menu',
      icon: 'menu_book',
      path: '/menus',
    },
    {
      name: 'Platos',
      icon: 'restaurant',
      path: '/platos',
    },
    {
      name: 'Orders',
      icon: 'draftsOrders',
      path: '/ordenes',
    },
  ];

}
