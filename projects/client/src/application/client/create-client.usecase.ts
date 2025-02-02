import { TitleCasePipe } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { delay, finalize, map, Observable, Subscription, tap } from "rxjs";
import { IResponse } from "shared";
import { IClient } from "../../domain/model/client.model";
import { State } from "../../domain/state";
import { CreateService } from "../../infrastructure/services/client/create.service";

@Injectable({
  providedIn: 'root'
})
export class CreateClientUsecase {
  private readonly _service = inject(CreateService);
  private readonly _state = inject(State);
  private titleCasePipe = new TitleCasePipe();
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
        map(result => this.formatClientDetails(result)),
        tap(result => this.updateClientState(result)),
        delay(2000),
        finalize(() => this.resetClientState())
      ).subscribe()
    );
  }
  //#endregion

  //#region Private Methods
  private formatClientDetails(result: IResponse) {
    return {
      ...result,
      details: {
        ...result.details,
        name: this.titleCasePipe.transform(result.details.name),
        lastName: this.titleCasePipe.transform(result.details.lastName),
      }
    };
  }

  private updateClientState(result: IResponse) {
    this._state.clients.message.set(result.message);
    const currentClients = this._state.clients.listClients.snapshot();
    this._state.clients.listClients.set([...currentClients, result.details]);
  }

  private resetClientState() {
    this._state.clients.currrentClient.set(null);
    this._state.clients.open.set(false);
    this._state.clients.message.set(null);
  }
  //#endregion
}