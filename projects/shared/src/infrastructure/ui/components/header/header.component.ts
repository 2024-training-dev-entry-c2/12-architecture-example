import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-header',
  imports: [MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})


export class HeaderComponent {
  public listMenu = [
    {
      name: 'Menú',
      path: '/menu',
    },
    {
      name: 'Platos',
      path: '/platos',
    },
    {
      name: 'Pedidos',
      path: '/ordenes',
    },
    {
      name: 'Clientes',
      path: '/clientes',
    },
  ];
}
