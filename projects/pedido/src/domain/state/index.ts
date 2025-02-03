import { inject, Injectable } from '@angular/core';
import { PedidoState } from './pedido.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _pedido = inject(PedidoState);

  get pedidoState() {
    return this._pedido.store();
  }
}
