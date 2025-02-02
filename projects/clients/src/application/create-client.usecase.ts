import { inject, Injectable } from "@angular/core";
import { CreateClientService } from "../infrastructure/services/create-client.service";
import { State } from "../domain/state";
import { delay, finalize, last, map, Observable, Subscription, tap } from "rxjs";
import { IClient } from "../domain/model/client.model";

@Injectable({
  providedIn: 'root'
})
export class CreateClientUseCase {
  private readonly _service = inject(CreateClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  message$(): Observable<string> {
    return this._state.clients.message.$();
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
      this._service.execute(client).pipe(
        map(result => ({
          ...result,
          details: {
            message: `Cliente ${result.details.name} creado con éxito`,
            name: result.details.name,
            lastName: result.details.lastName,
          }
        })),
        tap(result => {
          this._state.clients.message.set(result.message);
          const currentClients = this._state.clients.showClients.snapshot();
          this._state.clients.showClients.set([...currentClients]);
        }),
        delay(2000),
        finalize(() => {
          this._state.clients.message.set(null);
          this._state.clients.open.set(false);
          this._state.clients.message.set(null);
        })
      ).subscribe()
    );
  }
  //#endregion
}