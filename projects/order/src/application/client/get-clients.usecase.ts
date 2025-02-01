import { inject, Injectable } from "@angular/core";
import { map, Observable, Subscription } from "rxjs";
import { State } from "../../domain/state";
import { GetAllService } from "../../infrastructure/services/client/get-all.service";
import { IClient } from "../../domain/model/client.model";

@Injectable({
  providedIn: 'root'
})
export class GetClientsUsecase {
  private readonly _service = inject(GetAllService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  clients$(): Observable<IClient[]> {
    return this._state.orders.listClients.$();
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
        map(result => this._state.orders.listClients.set(result))
      )
      .subscribe()
    );
  }
  //#endregion
}