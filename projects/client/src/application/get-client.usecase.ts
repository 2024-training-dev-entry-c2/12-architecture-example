import { inject, Injectable } from "@angular/core";
import { State } from "../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { GetClientService } from "../infrastructure/services/get-client.service";
import { IClient } from "../domain/model/client.model";

@Injectable({
  providedIn: 'root'
})
export class GetClientUseCase {
  private readonly _service = inject(GetClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  clients$(): Observable<IClient[]> {
    return this._state.clientState.client.$();
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
          tap(this._state.clientState.client.set)
        ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  //#endregion
}