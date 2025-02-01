import { inject, Injectable } from "@angular/core";
import { OrdenState } from "./orden.state";


@Injectable({
  providedIn: 'root'
})
export class State {
  private readonly _ordenes = inject(OrdenState);

  get ordenes() {
    return this._ordenes.store();
  }
}
