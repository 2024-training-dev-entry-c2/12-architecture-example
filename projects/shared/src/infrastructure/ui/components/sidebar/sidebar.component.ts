import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-sidebar',
  imports: [RouterLink, MatIconModule],
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
      path: '/client',
    },
    {
      name: 'Menu',
      icon: 'menu_book',
      path: '/menu',
    },
    {
      name: 'Platos',
      icon: 'restaurant',
      path: '/dish',
    },
    {
      name: 'Orders',
      icon: 'draftsOrders',
      path: '/ordenes',
    },
  ];
}
