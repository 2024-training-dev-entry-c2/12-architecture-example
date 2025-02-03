import { inject, Injectable } from "@angular/core";

import { State } from "../../domain/state";
import { IClient, IClientRequest } from "../../domain/model/client.model";
import { Observable, Subscription, tap } from "rxjs";
import { ClientService } from "../../infrastructure/services/create/client.service";
import { UpdateClientService } from "../../infrastructure/services/update/update-client.service";

@Injectable({
  providedIn: 'root'
})
export class UpdateClientUsecase {
  private readonly _service = inject(UpdateClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  clientFound$(): Observable<IClient> {
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

  execute(user: IClientRequest, id: number): void {
    this.subscriptions.add(
      this._service.updateClient(user, id)
        .pipe(
          tap(result => {
            const clients = this._state.clients.users.snapshot();
            const updatedClients = clients.map((client) =>
              client.id === id ? result : client
            );
            this._state.clients.users.set(updatedClients);
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  selectClient(id: number): void {
    const currentBlog = this._state.clients.users.snapshot().find(user => user.id === id);
    this._state.clients.user.set(currentBlog);
  }
  //#endregion
}