import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-body-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './body-layout.component.html',
  styleUrl: './body-layout.component.scss'
})
export class BodyLayoutComponent {
  items = [
    {url: '/admin', text: 'Inicio'},
    {url: 'pedidos', text: 'Pedidos'},
    {url: 'clientes', text: 'Clientes'},
    {url: 'menus', text: 'Menús'},
    {url: 'platos', text: 'Platos'}
  ];
  user = 'admin';
  iconUrl = '/admin';
}
