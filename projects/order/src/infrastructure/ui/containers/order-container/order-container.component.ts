import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription, switchMap } from 'rxjs';
import { ModalComponent } from 'shared';
import { AddOrderUsecase } from '../../../../application/add-order.usecase';
import { DeleteOrderUsecase } from '../../../../application/delete-order.usecase';
import { GetAllOrdersUsecase } from '../../../../application/get-orders.usecase';
import { UpdateOrderUsecase } from '../../../../application/update-order.usecase';
import { IClient, IDish, IOrder } from '../../../../domain/model/order.model';
import { AsyncPipe } from '@angular/common';
import { OrderPageComponent } from '../../components/order-page/order-page.component';
import { GetAllClientsUsecase } from 'clients';
import { GetAllDishesUsecase } from 'dish';

@Component({
  selector: 'lib-order-container',
  imports: [AsyncPipe, OrderPageComponent],
  templateUrl: './order-container.component.html',
})
export class OrderContainerComponent implements OnInit, OnDestroy {
   private readonly _getAlluseCase = inject(GetAllOrdersUsecase);
    private readonly _deleteOrderUseCase = inject(DeleteOrderUsecase);
    private readonly _createOrderUseCase = inject(AddOrderUsecase);
    private readonly _updateOrderUseCase = inject(UpdateOrderUsecase);
    private readonly _getAllClientsUseCase = inject(GetAllClientsUsecase);
    private readonly _getAllDishesUseCase = inject(GetAllDishesUsecase);
    public clients$: Observable<IClient[]>;
    public dishes$: Observable<IDish[]>;
    public orders$: Observable<IOrder[]>;
    public currentOrder$: Observable<IOrder>;
    protected intervalSub: Subscription;
  
    ngOnInit(): void {
      this._getAlluseCase.initSubscriptions();
      this._createOrderUseCase.initSubscriptions();
      this._updateOrderUseCase.initSubscriptions();
      this._getAllClientsUseCase.initSubscriptions();
      this._getAllDishesUseCase.initSubscriptions();
      this._getAlluseCase.execute();
      this._getAllClientsUseCase.execute();
      this._getAllDishesUseCase.execute();
      this.dishes$ = this._getAllDishesUseCase.dishes$();
      this.clients$ = this._getAllClientsUseCase.clients$();
      this.orders$ = this._getAlluseCase.orders$();
      this.currentOrder$ = this._updateOrderUseCase.currentOrder$();
      this.intervalSub = interval(200).pipe(switchMap(async () => this._getAlluseCase.execute())).subscribe();
    }
  
    
    ngOnDestroy(): void {
      this._createOrderUseCase.destroySubscriptions();
      this._getAlluseCase.destroySubscriptions();
      this._updateOrderUseCase.destroySubscriptions();
      this._getAllClientsUseCase.destroySubscriptions();
      this._getAllDishesUseCase.destroySubscriptions();
    }
  
    handleOrder({order, modal}: {order: IOrder; modal: ModalComponent}){
      const usecase = order.id ? this._updateOrderUseCase : this._createOrderUseCase;
      usecase.execute(order, modal);
      modal.toggle();
    }
  
    handleDelete(id: number) {
      this._deleteOrderUseCase.execute(id);
    }
  
    handleSelectOrder(id: number) {
      this._updateOrderUseCase.selectOrder(id);
    }
  
}
