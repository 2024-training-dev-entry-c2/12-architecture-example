import { CurrencyPipe, DatePipe, TitleCasePipe } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { delay, finalize, map, mergeMap, Observable, Subscription, tap } from "rxjs";
import { IOrder } from "../../domain/model/order.model";
import { State } from "../../domain/state";
import { UpdateService } from "../../infrastructure/services/order/update.service";
import { GetNamesClientsUsecase } from "../client/get-name.usecase";

@Injectable({
  providedIn: 'root'
})
export class UpdateOrderUsecase {
  private readonly _useCaseName = inject(GetNamesClientsUsecase);
  private readonly _service = inject(UpdateService);
  private readonly _state = inject(State);
  private currencyPipe = new CurrencyPipe('en');
  private datePipe = new DatePipe('es');
  private titleCasePipe = new TitleCasePipe();
  private subscriptions: Subscription;

  //#region Observables
  message$(): Observable<string> {
    return this._state.orders.message.$();
  }

  currentOrder$(): Observable<IOrder> {
    return this._state.orders.currentOrder.$();
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
      this._service.execute(order.id, order).pipe(
        mergeMap(result => (
          this._useCaseName.execute(result.details.id).pipe(
            map(client => (
              {
                message: result.message,
                details: {
                  ...result.details,
                  date: this.datePipe.transform(result.details.date, 'longDate'),
                  totalPrice: this.currencyPipe.transform(result.details.totalPrice, 'COP'),
                  dishesQuantity: result.details.orderDetails.reduce((acc, orderDetail) => acc + orderDetail.quantity, 0),
                  orderDetails: result.details.orderDetails.map(orderDetail => ({
                    ...orderDetail,
                    dish: {
                      ...orderDetail.dish,
                    },
                    unitPrice: this.currencyPipe.transform(orderDetail.unitPrice, 'COP'),
                    subTotal: this.currencyPipe.transform(orderDetail.subTotal, 'COP')
                  })),
                  clientName: this.titleCasePipe.transform(client.name + ' ' + client.lastName),
                  clientId: client.id,
                }
              }
            )),
            tap(result => {
              this._state.orders.message.set(result.message);
              const currentOrders = this._state.orders.listOrders.snapshot();
              const updatedOrders = currentOrders.map(current => current.id === result.details.id ? result.details : current);
              this._state.orders.listOrders.set(updatedOrders);
            }),
          )
        )),
        delay(2000),
        finalize(() => {
          this._state.orders.currentOrder.set(null);
          this._state.orders.open.set(false);
          this._state.orders.message.set(null);
        })
      ).subscribe(console.log)
    );
  }

  selectOrder(orderId: number) {
    const currentOrder = this._state.orders.listOrders.snapshot().find(dish => dish.id === orderId);
    this._state.orders.currentOrder.set(currentOrder);
  }
  //#endregion
}