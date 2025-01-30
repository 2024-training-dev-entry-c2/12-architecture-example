import { Component, inject } from '@angular/core';
import { CreateOrderUseCase } from '../../../../application/create-orders.usecase';
import { GetUsersListUsecase, IClient } from 'client';
import { GetMenusListUseCase, IMenu } from 'menus';
import { Observable } from 'rxjs';
import { IOrder, IOrderRequest } from '../../../../domain/model/order.model';
import { CreateOrderFormComponent } from '../../forms/create-order-form/create-order-form.component';


@Component({
  selector: 'lib-create-order',
  imports: [CreateOrderFormComponent],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent {
  private readonly __useCase = inject(CreateOrderUseCase);
  private _useCaseClients = inject(GetUsersListUsecase);
  private _useCasemenus = inject(GetMenusListUseCase);

  public order$: Observable<IOrder>;
  clientList: IClient[] = [];
  menuList: IMenu[] = [];

  ngOnInit(): void {
    this.__useCase.initSubscription();
    this.order$ = this.__useCase.order$();
    this.getData();
  }
  ngOnDestroy(): void {
    this.__useCase.destroySubcriptions();
  }
  createOrder(order: IOrderRequest): void {
    console.log(order);
    
    this.__useCase.execute(order);
  }

  getData(): void {
    this._useCaseClients.execute();
    this._useCaseClients.clients$().subscribe({
      next: (clients: IClient[]) => {
        this.clientList = clients;
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      },
    });
    this._useCasemenus.execute();
    this._useCasemenus.menus$().subscribe({
      next: (menus: IMenu[]) => {
        this.menuList = menus;
      },
      error: (err) => {
        console.error('Error al obtener menús:', err);
      },
    });
  }
}
