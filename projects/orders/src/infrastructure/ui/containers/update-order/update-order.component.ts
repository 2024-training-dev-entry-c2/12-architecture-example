import { Component, inject } from '@angular/core';
import { CreateOrderUseCase } from '../../../../application/create-orders.usecase';
import { GetUsersListUsecase, IClient } from 'client';
import { GetMenusListUseCase, IMenu } from 'menus';
import { IOrder, IOrderRequest } from '../../../../domain/model/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GetOrderUseCase } from '../../../../application/get-orders.usecase';

import { UpdateOrderUsecase } from '../../../../application/update-order.usecase';
import { UpdateOrderFormComponent } from '../../forms/update-order-form/update-order-form.component';

@Component({
  selector: 'lib-update-order',
  imports: [UpdateOrderFormComponent],
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.css',
})
export class UpdateOrderComponent {
  private readonly __useCase = inject(UpdateOrderUsecase);
  private readonly __useCaseget = inject(GetOrderUseCase);
  
  private _useCaseClients = inject(GetUsersListUsecase);
  private _useCasemenus = inject(GetMenusListUseCase);
  public order: IOrder | null = null;
  public orderId: number = 0;
  clientList: IClient[] = [];
  menuList: IMenu[] = [];
  constructor(private route: ActivatedRoute) {}
  private readonly destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.getOrder(this.orderId);
    this.getData();
  }
  getOrder(id: number) {
    this.__useCaseget.execute(id).subscribe({
      next: (order: any) => {
        this.order = order;
      },
      error: (err) => {
        console.error('Error al obtener order:', err);
      },
    });
  }

  updateOrder(order: IOrderRequest): void {
    console.log(order);
    this.__useCase.execute(order, this.orderId);
  
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
