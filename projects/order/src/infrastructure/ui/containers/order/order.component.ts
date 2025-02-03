import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ModalComponent, TableComponent } from 'shared';
import { GetClientsUsecase } from '../../../../application/client/get-clients.usecase';
import { GetDishesUsecase } from '../../../../application/dish/get-dishes.usecase';
import { ModalUsecase } from '../../../../application/modal.usecase';
import { CreateOrderUsecase } from '../../../../application/order/create-order.usecase';
import { DeleteOrderUsecase } from '../../../../application/order/delete-order.usecase';
import { GetOrdersUsecase } from '../../../../application/order/get-orders.usecase';
import { UpdateOrderUsecase } from '../../../../application/order/update-order.usecase';
import { IClient } from '../../../../domain/model/client.model';
import { IDish } from '../../../../domain/model/dish.model';
import { IOrder } from '../../../../domain/model/order.model';
import { ViewDetailsComponent } from "../../components/view-details/view-details.component";
import { OrderFormComponent } from '../../forms/order-form/order-form.component';

@Component({
  selector: 'lib-order',
  imports: [TableComponent, ModalComponent, OrderFormComponent, AsyncPipe, ViewDetailsComponent],
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit, OnDestroy {
  private readonly _createUseCase = inject(CreateOrderUsecase);
  private readonly _getUseCase = inject(GetOrdersUsecase);
  private readonly _deleteUseCase = inject(DeleteOrderUsecase);
  private readonly _updateUseCase = inject(UpdateOrderUsecase);
  private readonly _modalUseCase = inject(ModalUsecase);
  private readonly _clientsUseCase = inject(GetClientsUsecase);
  private readonly _dishesUseCase = inject(GetDishesUsecase);

  public orders$: Observable<IOrder[]>;
  public clients$: Observable<IClient[]>;
  public dishes$: Observable<IDish[]>;
  public order$: Observable<IOrder>;
  public message$: Observable<string>;
  public isOpen$: Observable<boolean>;
  public isOpenDetails$: Observable<boolean>;

  public currentOrder$: Observable<IOrder>;

  public columns = [
    { field: 'date', header: 'Fecha' },
    { field: 'totalPrice', header: 'Precio Total' },
    { field: 'dishesQuantity', header: 'Cantidad de Platos' },
    { field: 'clientName', header: 'Cliente' }
  ];

  ngOnInit(): void {
    this.init();
    this._getUseCase.execute();
    this._clientsUseCase.execute();
    this._dishesUseCase.execute();
    this.initializeObservables();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  public closeDetailsModal(event: boolean): void {
    this._modalUseCase.executeDetails(event);
  }

  public openDetailsModal(id: number): void {
    this._modalUseCase.executeDetails(true);
    this.order$ = this.getDetails(id) as Observable<IOrder>;
  }

  public getDetails(orderId: number): Observable<IOrder> | undefined {
    return this.orders$.pipe(map(orders => orders.find((_, i) => i === orderId)));
  }

  public deleteOrder(orderId: number): void {
    this._deleteUseCase.execute(orderId);
  }

  public updateById(orderId: number): void {
    this._updateUseCase.selectOrder(orderId);
  }

  public submit(dish: IOrder): void {
    const usecase = dish.id ? this._updateUseCase : this._createUseCase;
    usecase.execute(dish);
  }

  public openModal(event: boolean) {
    this._modalUseCase.execute(event);
  }

  private init(): void {
    this._createUseCase.initSubscriptions();
    this._getUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._modalUseCase.initSubscriptions();
    this._clientsUseCase.initSubscriptions();
    this._dishesUseCase.initSubscriptions();
  }

  private destroy(): void {
    this._createUseCase.destroySubscriptions();
    this._getUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._modalUseCase.destroySubscriptions();
    this._clientsUseCase.destroySubscriptions();
    this._dishesUseCase.destroySubscriptions();
  }

  private initializeObservables(): void {
    this.orders$ = this._getUseCase.orders$();
    this.clients$ = this._clientsUseCase.clients$();
    this.dishes$ = this._dishesUseCase.dishes$();
    this.currentOrder$ = this._updateUseCase.currentOrder$();
    this.message$ = this._createUseCase.message$();
    this.isOpen$ = this._modalUseCase.open$();
    this.isOpenDetails$ = this._modalUseCase.openDetails$();
  }
}