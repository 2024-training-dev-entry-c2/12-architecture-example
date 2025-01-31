import { inject, Injectable } from "@angular/core";
import { delay, finalize, Observable, Subscription, tap } from "rxjs";
import { IClient } from "../../domain/model/client.model";
import { State } from "../../domain/state";
import { UdpateService } from "../../infrastructure/services/client/udpate.service";

@Injectable({
  providedIn: 'root'
})
export class UpdateClientUsecase {
  private readonly _service = inject(UdpateService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  message$(): Observable<string> {
    return this._state.clients.message.$();
  }

  currentClient$(): Observable<IClient> {
    return this._state.clients.currrentClient.$();
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(client: IClient) {
    this.subscriptions.add(
      this._service.execute(client.id, client).pipe(
        tap(result => {
          this._state.clients.message.set(result.message);
          const currentClients = this._state.clients.listClients.snapshot();
          const updatedClients = currentClients.map(current => current.id === client.id ? { ...current, ...client } : current);
          this._state.clients.listClients.set(updatedClients);
        }),
        delay(2000),
        finalize(() => {
          this._state.clients.currrentClient.set(null);
          this._state.clients.message.set(null);
        })
      ).subscribe()
    );
  }

  selectClient( clientId: number) {
    const currentClient = this._state.clients.listClients.snapshot().find(client => client.id === clientId);
    this._state.clients.currrentClient.set(currentClient);
  }
  //#endregion
}