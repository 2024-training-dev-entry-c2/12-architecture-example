import { Component, inject } from '@angular/core';
import { GetOrdersUsecase } from '../../../../application/get-orders.usecase';
import { CreateOrdersUseCase } from '../../../../application/create-orders.usecase';
import { DeleteOrdersUseCase } from '../../../../application/delete-orders.usecase';
import { UpdateOrdersUseCase } from '../../../../application/update-orders.usecase';
import { Observable } from 'rxjs';
import { Iorder } from '../../../../domain/model/orders.model';
import { GetDishesUseCase, Idish } from 'dish';
import { TableOrderComponent } from '../../components/table-order/table-order.component';
import { AsyncPipe } from '@angular/common';
import { GetClientUseCase, Iclient } from 'clients';

@Component({
  selector: 'lib-order-container.ts',
  imports: [TableOrderComponent, AsyncPipe],
  templateUrl: './order-container.ts.component.html',
  styleUrl: './order-container.ts.component.scss',
})
export class OrderContainerTsComponent {
  private readonly _getOrdersUseCase = inject(GetOrdersUsecase);
  private readonly _createOrdersUseCase = inject(CreateOrdersUseCase);
  private readonly _DeleteOrdersUseCase = inject(DeleteOrdersUseCase);
  private readonly _UpdateOrdersUseCase = inject(UpdateOrdersUseCase);
  private readonly _getDishCase = inject(GetDishesUseCase);
  private readonly _getClients = inject(GetClientUseCase);

  public orders$: Observable<Iorder[]>;
  public orderUnique$: Observable<Iorder>;
  public platos$: Observable<Idish[]>;
  public user$: Observable<Iclient[]>;

  ngOnInit(): void {
    this._getOrdersUseCase.initSubscriptions();
    this._DeleteOrdersUseCase.initSubscriptions();
    this._UpdateOrdersUseCase.initSubscriptions();
    this._createOrdersUseCase.initSubscriptions();

    this._getOrdersUseCase.execute();
    this.orders$ = this._getOrdersUseCase.orders$();
    this.orderUnique$ = this._UpdateOrdersUseCase.menuUnique$();
    this.platos$ = this._getDishCase.dishes$();
    this.user$ = this._getClients.client$();
  }

  ngOnDestroy(): void {
    this._getOrdersUseCase.destroySubscriptions();
  }

  handleCreateOrder(order: Iorder) {
    this._createOrdersUseCase.execute(order);
  }

  handleSelectOrder(id: number) {
    this._UpdateOrdersUseCase.selectOrder(id);
  }

  handleDeleteOrder(id: number) {
    this._DeleteOrdersUseCase.execute(id);
  }
}
