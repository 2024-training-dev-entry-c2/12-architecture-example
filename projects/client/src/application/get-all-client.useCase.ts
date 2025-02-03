import { inject, Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { IClient } from "../domain/model/client.model";
import { State } from "../domain/state";
import { GetAllClientService } from "../infrastructure/services/get-all-client.service";

@Injectable({
  providedIn: 'root'
})

export class GetAllClientUseCase {
  private readonly _service = inject(GetAllClientService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;


  clients$(): Observable<IClient[]> {
    return this._state.clients.client.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }


  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }


  execute(): void {
    this.subscriptions.add(
      this._service.getAll()
        .pipe(
          tap(clients => {
            console.log(clients);
            this._state.clients.client.set(clients);
          })
        )
        .subscribe()
    );
  }
}