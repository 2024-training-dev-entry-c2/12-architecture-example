import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { UpdateClientService } from '../infrastructure/services/update-client.service';
import { IClient } from '../domain/model/client.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateClientUseCase {
  private readonly _service = inject(UpdateClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  currentMenu$(): Observable<IClient> {
    return this._state.clientState.currenClient.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(client: IClient): void {
    this.subscriptions.add(
      this._service
        .execute(client)
        .pipe(
          tap(() => {
            const clients = this._state.clientState.client.snapshot();
            const newClients = clients.map((c) =>
              c.id === client.id ? client : c
            );
            this._state.clientState.client.set(newClients);
            this._state.clientState.currenClient.set(null);
          })
        )
        .subscribe()
    );
  }

  selectMenu(id: number): void {
    const currentClient = this._state.clientState.client
      .snapshot()
      .find((menu) => menu.id === id);
    this._state.clientState.currenClient.set(currentClient);
  }
  //#endregion
}
