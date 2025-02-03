import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'lib-navbar-container',
  imports: [NavbarComponent],
  templateUrl: './navbar-container.component.html',
  styleUrl: './navbar-container.component.scss'
})
export class NavbarContainerComponent {

  logo = {
    url: '/',
    src: './logo.png',
    alt: "Gusteau's Logo that is displayed in the header of the page with the logo being a draw of 'Rattatouille'"
  };

  navLinks = [
    { name: 'Platos', path: '/dishes', ariaLabel: 'Go to dishes page' },
    { name: 'Menus', path: '/menus', ariaLabel: 'Go to menus page' },
    { name: 'Pedidos', path: '/orders', ariaLabel: 'Go to orders page' },
    { name: 'Clients', path: '/clients', ariaLabel: 'Go to clients page' }
  ];

}
