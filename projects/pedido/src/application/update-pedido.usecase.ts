import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { UpdatePedidoService } from '../infrastructure/services/update-pedido.service';
import { IPedido } from '../domain/model/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class UpdatePedidoUseCase {
  private readonly _service = inject(UpdatePedidoService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  currentPedido$(): Observable<IPedido> {
    return this._state.pedidoState.currenPedido.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(pedido: IPedido): void {
    this.subscriptions.add(
      this._service
        .execute(pedido)
        .pipe(
          tap(() => {
            const pedidos = this._state.pedidoState.pedido.snapshot();
            const newPedidos = pedidos.map((c) =>
              c.id === pedido.id ? pedido : c
            );
            this._state.pedidoState.pedido.set(newPedidos);
            this._state.pedidoState.currenPedido.set(null);
          })
        )
        .subscribe()
    );
  }

  selectPedido(id: number): void {
    const currentPedido = this._state.pedidoState.pedido
      .snapshot()
      .find((pedido) => pedido.id === id);
    this._state.pedidoState.currenPedido.set(currentPedido);
  }
  //#endregion
}
