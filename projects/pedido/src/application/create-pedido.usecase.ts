import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { CreatePedidoService } from '../infrastructure/services/create-pedido.service';
import { IPedido } from '../domain/model/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class CreatePedidoUseCase {
  private readonly _service = inject(CreatePedidoService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

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
          tap((pedido) => {
            const pedidos = this._state.pedidoState.pedido.snapshot();
            this._state.pedidoState.pedido.set([...pedidos, pedido]);
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
