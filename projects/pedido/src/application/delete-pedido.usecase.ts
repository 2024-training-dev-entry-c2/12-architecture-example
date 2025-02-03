import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { DeletePedidoService } from '../infrastructure/services/delete-pedido.service';

@Injectable({
  providedIn: 'root',
})
export class DeletePedidoUseCase {
  private readonly _service = inject(DeletePedidoService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .execute(id)
        .pipe(
          tap(() => {
            const pedidos = this._state.pedidoState.pedido.snapshot();
            this._state.pedidoState.pedido.set(
              pedidos.filter((unPedido) => unPedido.id != id)
            );
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
