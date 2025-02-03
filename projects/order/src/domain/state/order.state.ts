import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { BehaviorSubject } from 'rxjs';
import { IOrderResponse } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderState {
  private readonly _factory = inject(StateFactory);

  //#region Subjects
  private readonly orderResponse$ = new BehaviorSubject<IOrderResponse[]>([]);
  private readonly currentOrder$ = new BehaviorSubject<IOrderResponse>(null);
  //#endregion

  store() {
    return {
      orderResponse: this._factory.state(this.orderResponse$),
      currentOrder: this._factory.state(this.currentOrder$),
    };
  }
}
