import { Injectable, inject } from '@angular/core';
import { first, map, Observable, switchMap } from 'rxjs';
import { UpdateOrderService } from '../../infrastructure/services/update-order.service';
import { ListOrdersUseCase } from './list-orders.usecase';
import { IOrder } from '../../domain/model/orders.model';

@Injectable({
    providedIn: 'root'
})
export class UpdateOrderUseCase {
    private readonly _updateService = inject(UpdateOrderService);
    private readonly _listUsecase = inject(ListOrdersUseCase);

    updateOrder(orderId: number, updatedOrderData: IOrder, orders$: Observable<IOrder[]>): Observable<IOrder> {
        return orders$.pipe(
          first(),
          map(orders => orders.find(order => order.idOrder === orderId)), 
          switchMap(orderToUpdate => {
            if (!orderToUpdate) {
              throw new Error('Orden no encontrada');
            }
    
            const updatedOrder: IOrder = {
              ...orderToUpdate,
              ...updatedOrderData
            };
    
            return this._updateService.updateOrder(orderId, updatedOrder).pipe(
              map(updatedOrder => {
                this._listUsecase.loadOrders(); 
                return updatedOrder;
              })
            );
          })
        );
      }
}
