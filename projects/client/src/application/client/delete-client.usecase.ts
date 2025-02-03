import { inject, Injectable } from "@angular/core";
import { finalize, Observable, Subscription, tap } from "rxjs";
import { State } from "../../domain/state";
import { DeleteService } from "../../infrastructure/services/client/delete.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteClientUsecase {
  private readonly _service = inject(DeleteService);
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

  execute(clientId: number) {
    this._service.execute(clientId).pipe(
      tap(result => {
        this._state.clients.message.set(result.message);
        const currentClients = this._state.clients.listClients.snapshot();
        this._state.clients.listClients.set(currentClients.filter(client => client.id !== clientId));
      }),
      finalize(() => this._state.clients.message.set(null))
    ).subscribe();
  }
  //#endregion
}