import { inject, Injectable } from '@angular/core';
import { StateFactory } from './state-factory';
import { BehaviorSubject } from 'rxjs';
import { IOrder } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly orders$ = new BehaviorSubject<IOrder[]>([]);
  //#endregion

  store() {
    return {
      orders: this._factory.state(this.orders$),
    };
  }
}
