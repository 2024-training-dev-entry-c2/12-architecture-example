import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersComponent } from "../../components/orders/orders.component";
import { ListsOrderUseCase } from '../../../../application/orders/list-orders.useCase';
import { CreateOrderUseCase } from '../../../../application/orders/create-orders.useCase';
import { UpdateOrdersUseCase } from '../../../../application/orders/update-orders.useCase';
import { DeleteOrderUseCase } from '../../../../application/orders/delete-order.useCase';
import { IOrder } from '../../../../domain/models/orders.model';
import { Observable } from 'rxjs';
import { ModalComponent } from 'shared';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-orders-container',
  imports: [OrdersComponent, AsyncPipe],
  templateUrl: './orders-container.component.html',
  styleUrl: './orders-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersContainerComponent implements OnInit, OnDestroy {

  private readonly _getUseCase = inject(ListsOrderUseCase);
  private readonly _createUseCase = inject(CreateOrderUseCase);
  private readonly _updateUseCase = inject(UpdateOrdersUseCase);
  private readonly _deleteUseCase = inject(DeleteOrderUseCase);
  public orders$: Observable<IOrder[]>;
  public currentOrder$: Observable<IOrder>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._updateUseCase.initSubscriptions();
    this._deleteUseCase.initSubscriptions();
    this._getUseCase.execute();
    this.orders$ = this._getUseCase.dish$();
    this.currentOrder$ = this._updateUseCase.currentOrder$();
  }

  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
    this._updateUseCase.destroySubscriptions();
    this._deleteUseCase.destroySubscriptions();
  }

  handleCreateOrders( {order, modal} :{order: IOrder; modal: ModalComponent}) {
    const useCase = order.id ? this._updateUseCase : this._createUseCase;
    setTimeout(() => {
      useCase.execute(order, modal);
    }, 500);
  }

  handleSelectOrder(id: string) {
    setTimeout(() => {
      this._updateUseCase.selectOrder(id);
    }, 500);
  }

  handleDeleteOrder(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
      setTimeout(() => {
        this._deleteUseCase.execute(id);
      }, 500);
    }
  }

}
