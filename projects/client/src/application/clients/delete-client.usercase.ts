import { inject, Injectable } from '@angular/core';

import { State } from '../../domain/state';
import { IClient } from '../../domain/model/client.model';
import { Observable, Subscription, tap } from 'rxjs';
import { RemoveClientService } from '../../infrastructure/services/remove/remove-client.service';

@Injectable({
  providedIn: 'root',
})
export class RemoveClientUsecase {
  private readonly _service = inject(RemoveClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription  =  new Subscription();

  //#region Observables
  user$(): Observable<IClient> {
    return this._state.clients.user.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      this.subscriptions = new Subscription(); 
    }
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .deleteClient(id)
        .pipe(
          tap(() => {
            const clients = this._state.clients.users.snapshot();
            const updatedClients = clients.filter(client => client.id !== id);
            this._state.clients.users.set(updatedClients);
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
