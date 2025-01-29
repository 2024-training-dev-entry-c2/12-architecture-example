import { inject, Injectable } from '@angular/core';

import { State } from '../../domain/state';
import { IClient } from '../../domain/model/client.model';
import { Observable, Subscription, tap } from 'rxjs';
import { ClientService } from '../../infrastructure/services/create/client.service';

@Injectable({
  providedIn: 'root',
})
export class CreateUserUsecase {
  private readonly _service = inject(ClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

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
    this.subscriptions.unsubscribe();
  }

  execute(id: number): void {
    this.subscriptions.add(
      this._service
        .deleteClient(id)
        .pipe(
          tap((result) => {
            const clients = this._state.clients.users.snapshot();
            const updateClient = clients.filter(client => id !== client.id);
            this._state.clients.users.set(updateClient);
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
