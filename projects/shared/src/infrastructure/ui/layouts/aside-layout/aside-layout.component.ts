import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';

@Component({
  selector: 'lib-aside-layout',
  imports: [HeaderComponent, NavigationComponent, FooterComponent],
  templateUrl: './aside-layout.component.html',
  styleUrl: './aside-layout.component.scss'
})
export class AsideLayoutComponent {
  public items = [
    {
      link: '/menus',
      icon: 'menu',
      title: 'Menus'
    },
    {
      link: '/dishes',
      icon: 'dish',
      title: 'Platos'
    },
    {
      link: '/orders',
      icon: 'order',
      title: 'Pedidos'
    },
    {
      link: '/clients',
      icon: 'client',
      title: 'Clientes'
    }
  ];
}
