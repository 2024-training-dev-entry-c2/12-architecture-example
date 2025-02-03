import { BehaviorSubject } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { StateFactory } from 'shared';
import { IPedido } from '../model/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoState {
  private readonly _factory = inject(StateFactory);
  private readonly pedido$ = new BehaviorSubject<IPedido[]>([]);
  private readonly currenPedido$ = new BehaviorSubject<IPedido>(null);

  store() {
    return {
      pedido: this._factory.state(this.pedido$),
      currenPedido: this._factory.state(this.currenPedido$),
    };
  }
}
