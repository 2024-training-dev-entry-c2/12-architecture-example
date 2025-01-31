import { inject, Injectable } from "@angular/core";
import { delay, finalize, Observable, Subscription, tap } from "rxjs";
import { IClient } from "../../domain/model/client.model";
import { State } from "../../domain/state";
import { CreateService } from "../../infrastructure/services/client/create.service";

@Injectable({
  providedIn: 'root'
})
export class CreateClientUsecase {
  private readonly _service = inject(CreateService);
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
        tap(result => {
          this._state.clients.message.set(result.message);
          const currentClients = this._state.clients.listClients.snapshot();
          this._state.clients.listClients.set([...currentClients, result.details]);
        }),
        delay(1000),
        finalize(() => this._state.clients.message.set(null))
      ).subscribe()
    );
  }
  //#endregion
}