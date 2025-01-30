import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-sidebar-main',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-main.component.html',
  styleUrl: './sidebar-main.component.scss'
})
export class SidebarMainComponent {
  menuItems = [
    { label: 'Panel de inicio', icon: 'svg/dashboard.svg#dashboard', link: '/' },
    { label: 'Menus', icon: 'svg/menu.svg#menu', link: '/menus' },
    { label: 'Platos', icon: 'svg/dish.svg#dish', link: '/dishes'  },
    { label: 'Clientes', icon: 'svg/client.svg#client', link: '/clients' },
    { label: 'Ordenes', icon: 'svg/order.svg#order', link: '/orders' }
  ];
}
