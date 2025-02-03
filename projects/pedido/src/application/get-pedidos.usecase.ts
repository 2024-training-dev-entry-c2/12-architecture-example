import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { GetPedidoService } from '../infrastructure/services/get-pedido.service';
import { IPedido } from '../domain/model/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class GetPedidosUseCase {
  private readonly _service = inject(GetPedidoService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  pedidos$(): Observable<IPedido[]> {
    return this._state.pedidoState.pedido.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(): void {
    this.subscriptions.add(
      this._service
        .execute()
        .pipe(tap(this._state.pedidoState.pedido.set))
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
