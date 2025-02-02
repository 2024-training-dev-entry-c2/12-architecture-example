import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateFacotory } from 'shared';
import { Iorder } from '../model/orders.model';

@Injectable({ providedIn: 'root' })
export class StateOrders {
  private readonly _factory = inject(StateFacotory);

  //#region sttes orders
  private readonly orders$ = new BehaviorSubject<Iorder[]>([]);
  private readonly orderUnique$ = new BehaviorSubject<Iorder>(null);
  //#endregion

  store() {
    return {
      orders: this._factory.stateFunctions(this.orders$),
      orderUnique: this._factory.stateFunctions(this.orderUnique$),
    };
  }
}
