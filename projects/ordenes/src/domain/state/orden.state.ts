import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { BehaviorSubject } from 'rxjs';
import { ICreateOrden } from '../model/create-orden.model';

@Injectable({
  providedIn: 'root',
})
export class OrdenState {
  private readonly _factory = inject(StateFactory);

  //#region Subjectsi
  private readonly ordenes$ = new BehaviorSubject<ICreateOrden[]>([]);
  private readonly currentOrdenes$ = new BehaviorSubject<ICreateOrden>(null);
  private readonly successMessage$ = new BehaviorSubject<string | null>(null);
  private readonly statusOrden$ = new BehaviorSubject<string>(null);

  //#endregion

  store() {
    return {
      ordenes: this._factory.state(this.ordenes$),
      currentOrdenes: this._factory.state(this.currentOrdenes$),
      successMessage: this._factory.state(this.successMessage$),
      statusOrden: this._factory.state(this.statusOrden$),
    };
  }
  setSuccessMessage(message: string | null) {
    this.successMessage$.next(message);
  }
}
