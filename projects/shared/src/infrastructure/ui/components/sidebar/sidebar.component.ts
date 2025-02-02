import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface NavItem {
  name: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'lib-sidebar',
  imports: [RouterLink, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public navItems: NavItem[] = [
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
