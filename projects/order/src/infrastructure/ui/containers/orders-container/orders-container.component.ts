import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetCustomersUseCase } from 'customer';
import { GetDishesUseCase } from 'dish';
import { CreateOrderUseCase } from '../../../../application/create-order.usecase';
import { GetOrdersUseCase } from '../../../../application/get-orders.usecase';
import { IOrder, IOrderForm } from '../../../../domain/models/order.model';
import { ListOrdersComponent } from '../../components/list-orders/list-orders.component';
import { ModalComponent, SelectOption } from 'shared';

@Component({
  selector: 'lib-orders-container',
  standalone: true,
  imports: [AsyncPipe, ListOrdersComponent],
  templateUrl: './orders-container.component.html',
})
export class OrdersContainerComponent implements OnInit, OnDestroy {
  private readonly _getOrdersUseCase = inject(GetOrdersUseCase);
  private readonly _createOrderUseCase = inject(CreateOrderUseCase);
  private readonly _getCustomersUseCase = inject(GetCustomersUseCase);
  private readonly _getDishesUseCase = inject(GetDishesUseCase);

  public orders$: Observable<IOrder[]>;
  public customerOptions$: Observable<SelectOption<number>[]>;
  public dishOptions$: Observable<SelectOption<number>[]>;

  ngOnInit() {
    this._getOrdersUseCase.initSubscriptions();
    this._createOrderUseCase.initSubscriptions();
    this._getCustomersUseCase.execute();
    this._getDishesUseCase.execute();

    this.orders$ = this._getOrdersUseCase.orders$();
    this.customerOptions$ = this._getCustomersUseCase.customers$().pipe(
      map((customers) =>
        customers.map((customer) => ({
          value: customer.customerId,
          label: `${customer.name} ${customer.lastName}`,
        }))
      )
    );
    this.dishOptions$ = this._getDishesUseCase.dishes$().pipe(
      map((dishes) =>
        dishes.map((dish) => ({
          value: dish.id,
          label: `${dish.name} - $${dish.price}`,
        }))
      )
    );
  }

  ngOnDestroy() {
    this._getOrdersUseCase.destroySubscriptions();
    this._createOrderUseCase.destroySubscriptions();
  }

  handleCreateOrder(event: { order: IOrderForm; modal: ModalComponent }) {
    this._createOrderUseCase.execute(event.order, event.modal);
  }
}
