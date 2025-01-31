import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Link } from '../../../../domain/model/link.model';

@Component({
  selector: 'lib-sidebar-container',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './sidebar-container.component.html',
})
export class SidebarContainerComponent {

  links: Link[] =[
    {
      text:'inicio',
      url:'/dashboard/home',
      aria:'Ir a la pagina principal'
    },
    {
      text:'clientes',
      url:'/dashboard/customer',
      aria:'Administrar clientes'
    },
    {
      text:'menus',
      url:'/dashboard/menu',
      aria:'Administrar menus'
    },
    {
      text:'platos',
      url:'/dashboard/dishes',
      aria:'Administrar platos'
    },
    {
      text:'ordenes',
      url:'/dashboard/orders',
      aria:'Administrar ordenes'
    }

  ]
}
