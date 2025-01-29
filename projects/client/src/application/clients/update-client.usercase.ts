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
  user$(): Observable<IClient> {
    return this._state.clients.user.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    if (!this.subscriptions) {
      this.subscriptions = new Subscription();
    }
  }

  destroySubscriptions(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  execute(user: IClientRequest, id: number): void {
    // Initialize subscriptions only if not yet initialized (e.g., if it's undefined)
    if (!this.subscriptions || this.subscriptions.closed) {
      this.initSubscriptions(); 
    }

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
  //#endregion
}