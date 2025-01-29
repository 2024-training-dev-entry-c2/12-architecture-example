import { inject, Injectable } from "@angular/core";
import { GetOrdersService } from "../../infrastructure/services/get-orders.service";
import { State } from "../../domain/state";
import { Observable, Subject, takeUntil } from "rxjs";
import { IOrders } from "../../domain/model/orders.model";

@Injectable({
  providedIn: 'root',
})
export class GetOrdersUseCase{
  private readonly _service = inject(GetOrdersService);
  private readonly _state = inject(State);
  private destroy$ = new Subject<void>();

  order$(): Observable<IOrders[]> {
    return this._state.orders.order.$();
  }

  getOrdersSnapshot(): IOrders[] {
    return this._state.orders.order.snapshot();
  }

  execute(): void {
    if (this.getOrdersSnapshot()?.length) {
      return;
    }

    this._service
      .getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (orders) => {
          this._state.orders.order.set(orders);
        },
        error: (error) => {
          console.error('Error fetching clients:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
