import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { GetUsersListUsecase, IClient } from 'client';
import { GetMenusListUseCase, IMenu } from 'menus';
import { ListOrdersUseCase } from 'orders';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [HeroSectionComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private readonly __useCase = inject(GetMenusListUseCase);
  private readonly __useCaseClient = inject(GetUsersListUsecase);
  private readonly __useCaseOrder = inject(ListOrdersUseCase);
  clientList: IClient[] = [];
  menuList: IMenu[] = [];
  orderList: any[] = [];
  show = false;

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    // Ejecutar los casos de uso antes de suscribirse a los observables
    this.__useCase.execute();
    this.__useCaseOrder.execute();
    this.__useCaseClient.execute();

    // Suscribirse a los menús
    this.__useCase.menus$().subscribe({
      next: (menus: IMenu[]) => {
        this.menuList = menus;
        this.checkDataLoaded();
      },
      error: (err) => {
        console.error('Error al obtener menús:', err);
      },
    });

    // Suscribirse a las órdenes
    this.__useCaseOrder.orders$().subscribe({
      next: (orders: any[]) => {
        this.orderList = orders;
        this.checkDataLoaded();
      },
      error: (err) => {
        console.error('Error al obtener órdenes:', err);
      },
    });
    this.__useCaseClient.clients$().subscribe({
      next: (clients: IClient[]) => {
        this.clientList = clients;
        this.checkDataLoaded();
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      },
    });

  }

  checkDataLoaded(): void {
    // Solo activar `show` cuando ambos datos han llegado
    if (this.menuList !=null && this.orderList !=null && this.clientList.length !=null) {
      this.show = true; 
    }
  }
}
