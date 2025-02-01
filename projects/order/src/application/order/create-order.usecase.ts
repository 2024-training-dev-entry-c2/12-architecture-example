import { inject, Injectable } from "@angular/core";
import { delay, finalize, map, Observable, Subscription, tap } from "rxjs";
import { CapitalizeFirstPipe } from "shared";
import { State } from "../../domain/state";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { CreateService } from "../../infrastructure/services/order/create.service";
import { IOrder } from "../../domain/model/order.model";

@Injectable({
  providedIn: 'root'
})
export class CreateOrderUsecase {
  private currencyPipe = new CurrencyPipe('en');
  private capitalizeFirstPipe = new CapitalizeFirstPipe();
  private datePipe = new DatePipe('es');
  private readonly _service = inject(CreateService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  message$(): Observable<string> {
    return this._state.orders.message.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(order: IOrder) {
    this.subscriptions.add(
      this._service.execute(order).pipe(
        map(result => ({
          ...result,
          details: {
            ...result.details,
            date: this.datePipe.transform(result.details.date, 'longDate'),
            totalPrice: this.currencyPipe.transform(result.details.totalPrice, 'COP'),
            dishesQuantity: result.details.orderDetails.reduce((acc, orderDetail) => acc + orderDetail.quantity, 0),
            orderDetails: result.details.orderDetails.map(orderDetail => ({
              ...orderDetail,
              unitPrice: this.currencyPipe.transform(orderDetail.unitPrice, 'COP'),
              subTotal: this.currencyPipe.transform(orderDetail.subTotal, 'COP'),
            }))
          }
        })),
        tap(result => {
          this._state.orders.message.set(result.message);
          const currentDishes = this._state.orders.listOrders.snapshot();
          this._state.orders.listOrders.set([...currentDishes, result.details]);
          console.log(result.details);
        }),
        delay(2000),
        finalize(() => {
          this._state.orders.message.set(null);
          this._state.orders.open.set(false);
          this._state.orders.message.set(null);
        })
      ).subscribe(console.log)
    );
  }
  //#endregion
}