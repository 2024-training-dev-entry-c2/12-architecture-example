import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteOrderService } from '../../infrastructure/services/delete-order.service';
import { ListOrdersUseCase } from './list-orders.usecase';

@Injectable({
  providedIn: 'root'
})
export class DeleteOrderUseCase {
  private readonly _deleteService = inject(DeleteOrderService);
  private readonly _listUsecase = inject(ListOrdersUseCase);

  deleteOrder(id: number): Observable<void> {
    return new Observable<void>(observer => {
      this._deleteService.deleteOrder(id).subscribe({
        next: () => {
          this._listUsecase.loadOrders(); 
          observer.next();
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
