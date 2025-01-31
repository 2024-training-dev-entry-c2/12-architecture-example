import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { IClient } from "../../domain/model/client.model";
import { Observable, Subscription, tap } from "rxjs";
import { DeleteClientService } from "../../infrastructure/services/delete-client.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteClientUsecase {
  private readonly _service = inject(DeleteClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  //#region Observables
  clients$(): Observable<IClient[]> {
    return this._state.clients.$();
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
      this._service.execute(id)
        .pipe(
          tap(() => {
            const currentClients = this._state.clients.snapshot();
            const updatedClients = currentClients.filter(client => client.id !== id);
            this._state.clients.set(updatedClients);
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
