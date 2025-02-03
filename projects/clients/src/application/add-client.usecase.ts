import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { DeleteClientService } from "../infrastructure/service/delete-client.service";
import { State } from "../domain/state";
import { IClient } from "../domain/model/client.model";
import { AddClientService } from "../infrastructure/service/add-client.service";
import { ModalComponent } from "shared";

@Injectable({
  providedIn: 'root'
})
export class AddClientUsecase {
  private readonly _service = inject(AddClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  clients$(): Observable<IClient[]> {
    return this._state.clients.allClient.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    if (!this.subscriptions || this.subscriptions.closed) {
      this.subscriptions = new Subscription();
    }
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(client: Partial<IClient>, modal:ModalComponent): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service.create(client).pipe(
        tap((client) => {
            console.log(`Cliente ${client.name} creado`);
            const clients = this._state.clients.allClient.snapshot();
            this._state.clients.allClient.set([...clients, client]);
            modal.toggle();
        }),
      ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}