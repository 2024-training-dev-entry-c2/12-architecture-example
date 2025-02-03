import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Subscription, tap } from 'rxjs';
import { DeleteClientService } from '../infrastructure/services/delete-client.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteClientUseCase {
  private readonly _service = inject(DeleteClientService);
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
            const clients = this._state.clientState.client.snapshot();
            this._state.clientState.client.set(clients.filter((unCliente)=> unCliente.id != id));
          })
        )
        .subscribe()
    );
  }
  //#endregion
}
