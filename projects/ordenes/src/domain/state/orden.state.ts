import { inject, Injectable } from "@angular/core";
import {StateFactory} from 'shared';
import { BehaviorSubject } from "rxjs";
import { IViewOrden } from "../model/orden.model";



@Injectable({
  providedIn: 'root'
})
export class OrdenState {
  private readonly _factory = inject(StateFactory);

  //#region Subjectsi
  private readonly ordenes$ = new BehaviorSubject<IViewOrden[]>([]);
  private readonly currentOrdenes$ = new BehaviorSubject<IViewOrden>(null);
  private readonly successMessage$ = new BehaviorSubject<string | null>(null);

  //#endregion

  store() {
    return {
      ordenes: this._factory.state(this.ordenes$),
      currentOrdenes: this._factory.state(this.currentOrdenes$),
      successMessage: this._factory.state(this.successMessage$)
    }
  }
  setSuccessMessage(message: string | null) {
    this.successMessage$.next(message);
  }
}
