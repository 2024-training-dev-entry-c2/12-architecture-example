import { Component, inject } from '@angular/core';
import { AnimationWrapperComponent, ModalComponent, TableComponent } from 'shared';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CreateOrderUseCase } from '../../../../application/create-order.usecase';
import { DeleteOrderUseCase } from '../../../../application/delete-order.usecase';
import { GetAllOrdersUseCase } from '../../../../application/get-all-orders.usecase';
import { GetAllDishesUseCase } from '../../../../application/get-dishes.usecase';
import { ModalUseCase } from '../../../../application/modal.usecase';
import { UpdateOrderUseCase } from '../../../../application/update-order.usecase';
import { IClient } from '../../../../domain/model/client.model';
import { IDish } from '../../../../domain/model/dish.model';
import { IOrder } from '../../../../domain/model/order.model';
import { GetClientsUseCase } from '../../../../application/get-clients.usecase';

@Component({
  selector: 'lib-order',
  imports: [AnimationWrapperComponent, ModalComponent, TableComponent, OrderFormComponent, AsyncPipe],
  templateUrl: './order.component.html',
})
export class OrderComponent {
  private readonly _useCaseGet = inject(GetAllOrdersUseCase);
  private readonly _useCaseModal = inject(ModalUseCase);
  private readonly _useCaseCreate = inject(CreateOrderUseCase);
  private readonly _useCaseUpdate = inject(UpdateOrderUseCase);
  private readonly _useCaseDelete = inject(DeleteOrderUseCase);
  private readonly _useCaseGetDishes = inject(GetAllDishesUseCase);
  private readonly _useCaseGetClients = inject(GetClientsUseCase);

  public orders$: Observable<IOrder[]>
  public dishes$: Observable<IDish[]>
  public clients$: Observable<IClient[]>
  public isModalOpen$: Observable<boolean>;
  public selectedOrder$: Observable<IOrder>;
  public message$: Observable<string>;

  public columns = [
    { field: 'id', header: 'Orden N#' }, 
    { field: 'client.name', header: 'Nombre del Cliente' }, 
    { field: 'client.lastName', header: 'Apellido del Cliente' },
    { field: 'orderDate', header: 'Fecha de la Orden' },
    { field: 'dishes', header: 'Platos Comprados' }, 
    { field: 'totalPrice', header: 'Precio Total' }, 
  ];
  
  ngOnInit(): void {
    this._useCaseCreate.initSubscriptions();
    this._useCaseUpdate.initSubscriptions();
    this._useCaseGet.initSubscriptions();
    this._useCaseDelete.initSubscriptions();
    this._useCaseModal.initSubscriptions();
    this._useCaseGetDishes.initSubscriptions();
    this._useCaseGetClients.initSubscriptions();
    this._useCaseGet.execute();
    this._useCaseGetDishes.execute();
    this._useCaseGetClients.execute();
    this.orders$ = this._useCaseGet.order$();
    this.selectedOrder$ = this._useCaseUpdate.currentOrder$();
    this.isModalOpen$ = this._useCaseModal.openModal$();
    this.message$ = this._useCaseCreate.message$();
    this.dishes$ = this._useCaseGetDishes.dish$();
    this.clients$ = this._useCaseGetClients.client$();
  }

  ngOnDestroy(): void {
    this._useCaseCreate.destroySubscriptions();
    this._useCaseUpdate.destroySubscriptions
    this._useCaseGet.destroySubscriptions();
    this._useCaseModal.destroySubscriptions();
    this._useCaseDelete.destroySubscriptions();
  }

    openModal(event: boolean) {
      this._useCaseModal.execute(event);
    }
  
    public submit(order: IOrder) {
      const usecase = order.id ? this._useCaseUpdate : this._useCaseCreate;
      usecase.execute(order);
    }
  
    public updateOrderById(orderId: number): void {
      this._useCaseUpdate.selectOrder(orderId);
    }
  
    public deleteOrderById(orderId: number): void {
      this._useCaseDelete.execute(orderId);
    }
}
