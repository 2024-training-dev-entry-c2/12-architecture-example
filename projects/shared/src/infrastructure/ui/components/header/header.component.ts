import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  options = [{
    url: "menus",
    name: "Menus"
  }, {
    url: "clientes",
    name: "Clientes"
  }, {
    url: "platos",
    name: "Platos"
  }, {
    url: "pedidos",
    name: "Pedidos"
  }
  ]
}
