import { CurrencyPipe, DatePipe, TitleCasePipe } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { forkJoin, map, mergeMap, Observable, Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { IOrder } from "../../domain/model/order.model";
import { GetNamesUsecase } from "../client/get-name.usecase";
import { GetAllService } from "../../infrastructure/services/order/get-all.service";
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@Injectable({
  providedIn: 'root'
})

export class GetOrdersUsecase {
  private readonly _useCaseName = inject(GetNamesUsecase);
  private readonly _service = inject(GetAllService);
  private readonly _state = inject(State);
  private titleCasePipe = new TitleCasePipe();
  private currencyPipe = new CurrencyPipe('en');
  private datePipe = new DatePipe('es');
  private subscriptions: Subscription;

  //#region Observables
  orders$(): Observable<IOrder[]> {
    return this._state.orders.listOrders.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service.execute()
        .pipe(
          map(result => result.map(order => this._useCaseName.execute(order.id).pipe(
            map(client => ({
              ...order,
              clientName: this.titleCasePipe.transform(client?.name + ' ' + client?.lastName),
              clientId: client?.id,
              totalPrice: this.currencyPipe.transform(order.totalPrice, 'COP'),
              date: order.date ? this.datePipe.transform(order.date, 'longDate', 'es') : 'Fecha no disponible',
              dishesQuantity: order.orderDetails.reduce((acc, orderDetail) => acc + orderDetail.quantity, 0),
              orderDetails: order.orderDetails.map(orderDetail => ({
                ...orderDetail,
                unitPrice: this.currencyPipe.transform(orderDetail.unitPrice, 'COP'),
                subTotal: this.currencyPipe.transform(orderDetail.subTotal, 'COP')
              }))
            }))
          ))),
          mergeMap(result => forkJoin(result)),
          tap(result => this._state.orders.listOrders.set(result))
        )
        .subscribe(console.log)
    );
  }
  //#endregion
}