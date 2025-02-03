import { inject, Injectable } from "@angular/core";

import { Observable, Subscription, tap } from "rxjs";
import { GetAllClientsService } from "../infrastructure/service/get-all-clients.service";
import { State } from "../domain/state";
import { IClient } from "../domain/model/client.model";

@Injectable({
  providedIn: 'root'
})
export class GetAllClientsUsecase {
  private readonly _service = inject(GetAllClientsService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  clients$(): Observable<IClient[]> {
    return this._state.clients.allClient.$();
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
          tap(result => {
            this._state.clients.allClient.set(result);
          })
        )
        .subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}