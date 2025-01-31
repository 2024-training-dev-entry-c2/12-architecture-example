import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { DeleteClientService } from "../infrastructure/service/delete-client.service";
import { State } from "../domain/state";
import { IClient } from "../domain/model/client.model";

@Injectable({
  providedIn: 'root'
})
export class DeleteClientUsecase {
  private readonly _service = inject(DeleteClientService);
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

  execute(id: number): void {
    this.initSubscriptions();
    this.subscriptions.add(
      this._service.delete(id).pipe(
        tap(() => {
          console.log(`Cliente con ID ${id} eliminado`);
          const updatedClients = this._state.clients.allClient.snapshot().filter(client => client.id !== id);
          this._state.clients.allClient.set(updatedClients);
        }),
      ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}