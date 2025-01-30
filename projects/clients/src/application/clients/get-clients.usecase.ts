import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { IClient } from "../../domain/model/client.model";
import { Observable, Subscription, tap } from "rxjs";
import { GetClientsService } from "../../infrastructure/services/get-clients.service";

@Injectable({
  providedIn: 'root'
})
export class GetClientsUsecase {
  private readonly _service = inject(GetClientsService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

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

  execute(): void {
    this.subscriptions.add(
      this._service.execute()
        .pipe(
          tap(clients => this._state.clients.set(clients))
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}
