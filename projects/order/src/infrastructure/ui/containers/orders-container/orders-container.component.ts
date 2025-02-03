import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersComponent } from '../../components/orders/orders.component';
import { ListOrdersUsecase } from '../../../../application/orders/list-orders.usecase';
import { CreateOrderUsecase } from '../../../../application/orders/create-order.usecase';
import { UpdateOrderUsecase } from '../../../../application/orders/update-order.usecase';
import { Observable } from 'rxjs';
import {
  IOrder,
  IOrderRequestDTO,
  IOrderResponse,
} from '../../../../domain/model/order.model';

@Component({
  selector: 'lib-orders-container',
  imports: [OrdersComponent],
  templateUrl: './orders-container.component.html',
})
export class OrdersContainerComponent implements OnInit, OnDestroy {
  private readonly _listUseCase = inject(ListOrdersUsecase);
  private readonly _createUseCase = inject(CreateOrderUsecase);
  private readonly _updateUseCase = inject(UpdateOrderUsecase);

  public orders$: Observable<IOrderResponse[]>;
  public currentOrder$: Observable<IOrderResponse>;
  public currentOrder: IOrderResponse;

  ngOnInit(): void {
    this._listUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    this._listUseCase.execute(formattedDate);
    this.orders$ = this._listUseCase.orderResponse$();
    this.currentOrder$ = this._updateUseCase.currentOrder$();
    this.currentOrder = this._updateUseCase.snapshotCurrentOrder();
  }

  updateOrder(data: { id: number; payload: IOrderRequestDTO }): void {
    this._updateUseCase.execute(data.id, data.payload);
  }

  createOrder(order: IOrder): void {
    this._createUseCase.execute(order);
  }

  ngOnDestroy(): void {
    this._listUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
  }
}
