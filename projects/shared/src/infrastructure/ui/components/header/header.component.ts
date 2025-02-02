import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-header',
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public listMenu = [
    {
      name: 'Menú',
      path: '#',
    },
    {
      name: 'Platos',
      path: '#',
    },
    {
      name: 'Pedidos',
      path: '#',
    },
    {
      name: 'Clientes',
      path: '#',
    },
  ];
}
