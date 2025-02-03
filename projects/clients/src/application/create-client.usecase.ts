import { inject, Injectable } from "@angular/core";
import { CreateClientService } from "../infrastructure/services/create-client.service";
import { State } from "../domain/state";
import { delay, finalize, Observable, Subscription, tap } from "rxjs";
import { IClient } from "../domain/model/client.model";

@Injectable({
  providedIn: 'root'
})
export class CreateClientUseCase {
  private readonly _service = inject(CreateClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Public Methods
  message$(): Observable<string> {
    return this._state.clients.message.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(client: IClient) {
    console.log(client);
    this.subscriptions.add(
      this._service.execute(client).pipe(
        tap(result => {
          this._state.clients.message.set('Cliente creado con éxito');
          const currentClients = this._state.clients.showClients.snapshot();
          this._state.clients.showClients.set([...currentClients, result]);
        }),
        delay(2000),
        finalize(() => {
          this._state.clients.open.set(false);
          this._state.clients.message.set('');
        })
      ).subscribe()
    );
  }
  //#endregion
}