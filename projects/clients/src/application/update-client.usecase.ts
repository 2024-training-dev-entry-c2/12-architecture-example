import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { State } from "../domain/state";
import { IClient } from "../domain/model/client.model";
import { ModalComponent } from "shared";
import { UpdateClientService } from "../infrastructure/service/update-client.service";

@Injectable({
  providedIn: 'root'
})
export class UpdateClientUsecase {
  private readonly _service = inject(UpdateClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  currentClient$(): Observable<IClient> {
    return this._state.clients.currentClient.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(client: IClient, modal:ModalComponent): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service.execute(client).pipe(
        tap(() => {
            const clients = this._state.clients.allClient.snapshot();
            const newClient = clients.map(c => c.id === client.id ? client : c);
            modal.toggle();
            this._state.clients.allClient.set(newClient);
        }),
      ).subscribe()
    );
  }

  selectClient(id: number): void {
    const currentClient = this._state.clients.allClient.snapshot().find(client => client.id === id);
    if(currentClient) {
      this._state.clients.currentClient.set(currentClient);
    } else {
      this._state.clients.currentClient.set(null);
    }
  }
  //#endregion

  //#region Private Methods
  //#endregion
}