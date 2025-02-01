import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public items = [
    {
      title: 'Cliente',
      link: '/client'
    },
    {
      title: 'Menú',
      link: '/menu'
    },
    {
      title: 'Platos',
      link: '/dishes'
    },
    {
      title: 'Órdenes',
      link: '/order'
    }
  ]
}
