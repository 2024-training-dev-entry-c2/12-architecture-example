import { TitleCasePipe } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { map, Observable, Subscription, tap } from "rxjs";
import { IClient } from "../../domain/model/client.model";
import { State } from "../../domain/state";
import { GetAllService } from "../../infrastructure/services/client/get-all.service";

@Injectable({
  providedIn: 'root'
})
export class GetClientsUsecase {
  private readonly _service = inject(GetAllService);
  private readonly _state = inject(State);
  private titleCasePipe = new TitleCasePipe();
  private subscriptions: Subscription;

  //#region Observables
  clients$(): Observable<IClient[]> {
    return this._state.clients.listClients.$() as Observable<IClient[]>;
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
          map(result => result.map(client => ({
            ...client,
            name: this.titleCasePipe.transform(client.name),
            lastName: this.titleCasePipe.transform(client.lastName)
          }))),
          tap(result => this._state.clients.listClients.set(result)),
        )
        .subscribe()
    );
  }
  //#endregion
}